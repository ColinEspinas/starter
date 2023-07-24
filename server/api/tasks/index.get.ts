import { tasks } from '~/server/schema/tasks.sql'

const db = useDatabase()
const prepared = db.select().from(tasks).orderBy(tasks.id).prepare('all-tasks')

export default defineEventHandler(async () => {
  return await prepared.execute()
})
