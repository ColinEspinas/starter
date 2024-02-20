export async function useUser() {
  const { data: user, refresh: refreshUser } = await useFetch('/api/kinde/me')

  const getHasPermission = async (permission: string) => {
    await refreshUser()
    if (!user.value)
      return false
    return user.value.permissions.some(p => p.key === permission) ?? false
  }

  const getHasRole = async (role: string) => {
    await refreshUser()
    if (!user.value)
      return false
    return user.value.roles.some(r => r.key === role) ?? false
  }

  return {
    user,
    refreshUser,
    getHasPermission,
    getHasRole,
  }
}
