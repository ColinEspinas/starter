import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()

export default defineEventHandler(async (event) => {
  const { title } = await readBody(event)

  try {
    await db
      .insert(tasks)
      .values(
        insertTaskSchema.parse({ title, completed: false }),
      )
  }
  catch (error) {
    console.error(error)
  }

  event.node.res.end()
})
