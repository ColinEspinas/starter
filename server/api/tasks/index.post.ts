import { count, eq, sql } from 'drizzle-orm'
import { insertTaskSchema, tasks } from '~/server/schema/tasks.sql'

const { kinde } = useRuntimeConfig()
const db = useDatabase()
const getTasksCountByUser = db.select({ value: count(tasks.id) }).from(tasks).where(eq(tasks.user, sql.placeholder('user_id'))).prepare('tasks-count-by-user')

export default defineEventHandler(async (event) => {
  const validatedTask = await readValidatedBody(event, (data: unknown) => insertTaskSchema.parse(data))

  const { client } = useKindeServerClient(event)
  const user = await client.getUserProfile()
  const managementApi = await useKindeManagementApi()

  if (user.id !== validatedTask.user)
    throw createError({ statusMessage: 'Unauthorized', statusCode: 403 })

  const permissions = (await managementApi.organizations.getOrganizationUserPermissions({
    orgCode: kinde.defaultOrg,
    userId: user.id,
  })).permissions || []

  if (permissions.some(permission => permission.key === 'unlimited-tasks')) {
    try {
      return await db.insert(tasks).values(validatedTask).returning()
    }
    catch (error) {
      throw createError({ statusMessage: 'Failed to insert task', statusCode: 500 })
    }
  }
  else {
    const count = (await getTasksCountByUser.execute({ user_id: user.id }))[0]
    if (count.value >= 3)
      throw createError({ statusMessage: 'Task limit reached', statusCode: 403 })

    try {
      return await db.insert(tasks).values(validatedTask).returning()
    }
    catch (error) {
      throw createError({ statusMessage: 'Failed to insert task', statusCode: 500 })
    }
  }
})
