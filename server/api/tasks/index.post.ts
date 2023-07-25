import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()

export default defineEventHandler(async (event) => {
  const { id, title, completed } = await readBody(event)

  try {
    await db
      .insert(tasks)
      .values(
        insertTaskSchema.parse({ id, title, completed }),
      )
  }
  catch (error) {
    console.error(error)
  }

  event.node.res.end()
})
