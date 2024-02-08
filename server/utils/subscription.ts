const { kinde } = useRuntimeConfig()

export async function useSubscription() {
  const kindeManagementApi = await useKindeManagementApi()

  const isUserSubscribed = async (userId: string) => {
    const { roles } = await kindeManagementApi.organizations.getOrganizationUserRoles({
      orgCode: kinde.defaultOrg,
      userId,
    })
    if (roles?.find(role => role.key === 'pro'))
      return true
    return false
  }

  const subscribeUser = async (userId: string) => {
    if (await isUserSubscribed(userId))
      throw createError({ statusMessage: 'User is already subscribed', statusCode: 409 })
    try {
      const { roles } = await kindeManagementApi.roles.getRoles()
      const proRoleId = roles?.find(role => role.key === 'pro')?.id
      if (!proRoleId)
        throw createError({ statusMessage: 'Failed to find pro role id', statusCode: 500 })

      await kindeManagementApi.organizations.createOrganizationUserRole({
        orgCode: kinde.defaultOrg,
        userId,
        createOrganizationUserRoleRequest: {
          roleId: proRoleId,
        },
      })
    }
    catch (error) {
      throw createError({ statusMessage: 'Failed to subscribe user', statusCode: 500 })
    }
  }

  const unsubscribeUser = async (userId: string) => {
    if (!await isUserSubscribed(userId))
      throw createError({ statusMessage: 'User is not subscribed', statusCode: 409 })
    try {
      const { roles } = await kindeManagementApi.roles.getRoles()
      const proRoleId = roles?.find(role => role.key === 'pro')?.id
      if (!proRoleId)
        throw createError({ statusMessage: 'Failed to find pro role id', statusCode: 500 })

      await kindeManagementApi.organizations.deleteOrganizationUserRole({
        orgCode: kinde.defaultOrg,
        userId,
        roleId: proRoleId,
      })
    }
    catch (error) {
      throw createError({ statusMessage: 'Failed to unsubscribe user', statusCode: 500 })
    }
  }

  return {
    isUserSubscribed,
    subscribeUser,
    unsubscribeUser,
  }
}
