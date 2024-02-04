import { eq, placeholder } from 'drizzle-orm'
import { z } from 'zod'
import { tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const prepared = db.delete(tasks).where(eq(tasks.id, placeholder('id'))).prepare('delete-task')

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (data: any) => z.number().parse(data.id))

  try {
    await prepared.execute({ id })
  }
  catch (error) {
    throw createError({ message: 'Failed to delete task', status: 500 })
  }

  event.node.res.end()
})
