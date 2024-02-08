import { eq, sql } from 'drizzle-orm'
import { tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const getTasksByUser = db.select().from(tasks).where(eq(tasks.user, sql.placeholder('user_id'))).orderBy(tasks.id).prepare('tasks-by-user')

export default defineEventHandler(async (event) => {
  const { client, sessionManager } = useKindeServerClient(event)
  const user = await client.getUserProfile(sessionManager)
  const userId = user.id

  try {
    return await getTasksByUser.execute({ user_id: userId })
  }
  catch (error) {
    throw createError({ statusMessage: 'Failed to fetch tasks', statusCode: 500 })
  }
})
