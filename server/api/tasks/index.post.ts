import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()

export default defineEventHandler(async (event) => {
  const validatedTask = await readValidatedBody(event, (data: unknown) => insertTaskSchema.parse(data))

  try {
    return await db.insert(tasks).values(validatedTask).returning()
  }
  catch (error) {
    throw createError({ message: 'Failed to insert task', status: 500 })
  }
})
