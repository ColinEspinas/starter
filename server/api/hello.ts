import { users } from './../db/schema'

const db = useDatabase()
const prepared = db.select().from(users).prepare('users')

export default defineEventHandler(async () => {
  return await prepared.execute()
})
