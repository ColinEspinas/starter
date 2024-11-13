import type { ModuleOptions } from '@nuxtjs/i18n'

export const i18nConfig: ModuleOptions = {
  locales: [
    { code: 'en', language: 'en-US', files: ['en.json'] },
    { code: 'fr', language: 'fr-FR', files: ['fr.json'] },
  ],
  strategy: 'prefix',
  defaultLocale: 'en',
}
