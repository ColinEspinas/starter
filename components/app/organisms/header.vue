<script setup lang="ts">
const colorMode = useColorMode()
const localePath = useLocalePath()

function toggleDark() {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}

const darkModeIcon = computed(() => {
  switch (colorMode.value) {
    case 'dark':
      return 'ph:moon-bold'
    case 'light':
      return 'ph:sun-bold'
    default:
      return 'ph:browser-bold'
  }
})
</script>

<template>
  <header class="flex justify-between items-center border-2 dark:border-base-900 border-base-100 p-2 rounded-xl">
    <div class="flex gap-2 items-center">
      <template v-if="$auth.loggedIn">
        <AppMoleculesMenu />
        <p v-if="$auth.user.given_name && $auth.user.family_name" class="font-medium">
          {{ `${$auth.user.given_name} ${$auth.user.family_name[0]}.` }}
        </p>
        <p v-else class="font-medium">
          {{ $auth.user.email }}
        </p>
      </template>
      <template v-else>
        <NuxtLink :to="localePath('/')" class="font-medium ml-1">
          {{ $t('common.app-name') }}
        </NuxtLink>
      </template>
    </div>
    <div class="flex gap-2">
      <template v-if="$auth.loggedIn">
        <UiAtomsButton
          to="/api/logout"
          external
          variant="accent"
          :text="$t('common.sign-out')"
        />
      </template>
      <template v-else>
        <UiAtomsButton
          :text="$t('common.sign-in')"
          :to="localePath('/auth/sign-in')"
        />
        <UiAtomsButton
          :text="$t('common.sign-up')"
          :to="localePath('/auth/sign-up')"
          variant="accent"
        />
      </template>
      <ClientOnly>
        <UiAtomsButton :before-icon="darkModeIcon" @click="toggleDark" />
      </ClientOnly>
    </div>
  </header>
</template>
