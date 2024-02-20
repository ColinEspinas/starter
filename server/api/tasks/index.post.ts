import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()

export default defineEventHandler(async (event) => {
  const validatedTask = await readValidatedBody(event, (data: unknown) => insertTaskSchema.parse(data))

  const { client } = useKindeServerClient(event)
  const user = await client.getUserProfile()

  if (user.id !== validatedTask.user)
    throw createError({ statusMessage: 'Unauthorized', statusCode: 403 })

  try {
    return await db.insert(tasks).values(validatedTask).returning()
  }
  catch (error) {
    throw createError({ statusMessage: 'Failed to insert task', statusCode: 500 })
  }
})
