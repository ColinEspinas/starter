<script setup lang="ts">
import { withQuery } from 'ufo'

const { kindeEmailConnectionId, kindeGithubConnectionId } = useRuntimeConfig().public
const { t } = useI18n()

useSeoMeta({
  title: `${t('common.app-name')} - ${t('subscribe.meta.title')}`,
  description: t('home.meta.description'),
})

const localePath = useLocalePath()
const email = ref('')

const githubLoginLink = withQuery('/api/login', { connection_id: kindeGithubConnectionId })
const emailLoginLink = computed(() => withQuery('/api/login', { connection_id: kindeEmailConnectionId, login_hint: email.value }))
</script>

<template>
  <div class="flex flex-col gap-6 w-full mx-auto max-w-[600px] py-10 px-5">
    <AppOrganismsHeader />
    <main class="flex flex-col gap-4">
      <article class="flex flex-col gap-2 rounded-xl bg-base-100 dark:bg-base-900 p-5">
        <h2 class="font-bold text-2xl">
          Welcome back!
        </h2>
        <p>
          <span>Don't have an account? </span>
          <NuxtLink :to="localePath('/auth/sign-up')" class="text-accent-600 dark:text-accent-400">
            {{ $t('common.sign-up') }}
          </NuxtLink>
        </p>

        <form class="flex gap-2 items-center">
          <input
            v-model="email"
            type="email"
            placeholder="Enter you email..."
            class="transition-all
            focus-within:border-base-600 focus-within:dark:border-base-400
            border-2 border-base-100 bg-base-50 dark:border-base-900 dark:bg-base-950
            rounded-lg p-2 outline-none w-full flex flex-col items-end gap-2"
          >
          <UiAtomsButton
            after-icon="ph:arrow-bend-up-right-bold"
            :text="$t('common.sign-in')"
            :to="emailLoginLink"
            external
            variant="accent"
            class="min-w-max"
            align="center"
          />
        </form>

        <div class="divider divider-start">
          OR
        </div>

        <div class="w-full">
          <UiAtomsButton
            text="Github"
            :to="githubLoginLink"
            before-icon="ph:github-logo"
            align="center"
            external
          />
        </div>
      </article>
    </main>
  </div>
</template>
