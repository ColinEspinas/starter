const { kinde } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { client } = useKindeServerClient(event)
  const clientUser = await client.getUserProfile()
  const managementApi = await useKindeManagementApi()

  try {
    const user = await managementApi.users.getUserData({ id: clientUser.id })

    const roles = (await managementApi.organizations.getOrganizationUserRoles({
      orgCode: kinde.defaultOrg,
      userId: clientUser.id,
    })).roles || []

    const permissions = (await managementApi.organizations.getOrganizationUserPermissions({
      orgCode: kinde.defaultOrg,
      userId: clientUser.id,
    })).permissions || []

    return {
      profile: user,
      roles,
      permissions,
    }
  }
  catch (error) {
    console.error(error)
    throw createError({ statusMessage: 'Failed to fetch user', statusCode: 500 })
  }
})
