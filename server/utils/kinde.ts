import type { H3Event } from 'h3'
import type { ACClient, SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import {
  APIsApi,
  ApplicationsApi,
  BusinessApi,
  CallbacksApi,
  Configuration,
  ConnectedAppsApi,
  EnvironmentsApi,
  FeatureFlagsApi,
  IndustriesApi,
  OAuthApi,
  OrganizationsApi,
  PermissionsApi,
  RolesApi,
  SubscribersApi,
  TimezonesApi,
  UsersApi,
} from '@kinde-oss/kinde-typescript-sdk'

const { kinde: config } = useRuntimeConfig()

const getApiToken = defineCachedFunction(async () => {
  const response = await $fetch<{ access_token: string }>(`${config.authDomain}/oauth2/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      audience: `${config.authDomain}/api`,
    }),
  })
  return response.access_token
}, {
  maxAge: 86400,
  name: 'kindeApiToken',
})

export async function useKindeManagementApi() {
  let apiToken: string
  try {
    apiToken = await getApiToken()
  }
  catch (error) {
    throw createError({ statusMessage: 'Failed to fetch Kinde API token', statusCode: 500 })
  }

  const configuration = new Configuration({
    basePath: config.authDomain,
    accessToken: apiToken,
    headers: { Accept: 'application/json' },
  })

  return {
    users: new UsersApi(configuration),
    oauth: new OAuthApi(configuration),
    subscribers: new SubscribersApi(configuration),
    organizations: new OrganizationsApi(configuration),
    connectedApps: new ConnectedAppsApi(configuration),
    featureFlags: new FeatureFlagsApi(configuration),
    environments: new EnvironmentsApi(configuration),
    permissions: new PermissionsApi(configuration),
    roles: new RolesApi(configuration),
    business: new BusinessApi(configuration),
    industries: new IndustriesApi(configuration),
    timezones: new TimezonesApi(configuration),
    applications: new ApplicationsApi(configuration),
    callbacks: new CallbacksApi(configuration),
    apis: new APIsApi(configuration),
  }
}

export function useKindeServerClient(event: H3Event) {
  const client = event.context.kinde

  return {
    client,
  }
}

type Slice<T extends Array<any>> = T extends [infer _A, ...infer B] ? B : never

declare module 'h3' {
  interface H3EventContext {
    kinde: {
      [key in keyof ACClient]: (
        ...args: Slice<Parameters<ACClient[key]>>
      ) => ReturnType<ACClient[key]>
    } & { sessionManager: SessionManager }
  }
}
