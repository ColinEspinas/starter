export async function useUser() {
  const { user } = useAuth()
  const client = useKindeClient()

  const { data: permissions } = await useAsyncData(`permissions-${user?.id ?? 'guest'}`, async () => {
    const { permissions } = (await client?.getPermissions()) ?? {}
    return permissions as string[]
  })

  const getHasPermission = (permission: string) => {
    return permissions.value?.includes(permission) ?? false
  }

  const { data: roles, refresh: refreshRoles } = await useAsyncData(`roles-${user?.id ?? 'guest'}`, async () => {
    const { value } = (await client?.getClaim('roles')) ?? {}
    return value as { id: string, key: string, name: string }[]
  })

  const getHasRole = (role: string) => {
    return roles.value?.some(r => r.key === role) ?? false
  }

  const { data: organization } = await useAsyncData(`organization-${user?.id ?? 'guest'}`, async () => {
    const { orgCode } = (await client?.getOrganization()) ?? {}
    return orgCode as string
  })

  return {
    permissions,
    roles,
    organization,
    getHasPermission,
    getHasRole,
    refreshRoles,
  }
}
