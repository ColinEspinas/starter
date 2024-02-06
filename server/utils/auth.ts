import type { H3Event } from 'h3'
import type { ACClient, SessionManager } from '@kinde-oss/kinde-typescript-sdk'

export function useKinde(event: H3Event) {
  const client = event.context.kinde as ({ sessionManager: SessionManager } & ACClient)

  return {
    client,
    sessionManager: client.sessionManager,
  }
}
