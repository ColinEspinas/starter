<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="flex justify-between items-center border-2 dark:border-base-900 border-base-100 p-2 rounded-xl">
    <div class="flex gap-2 items-center">
      <template v-if="$auth.loggedIn">
        <AppMoleculesMenu />
        <p class="font-medium">
          {{ `${$auth.user.given_name} ${$auth.user.family_name[0]}.` }}
        </p>
      </template>
      <template v-else>
        <p class="font-medium ml-1">
          {{ $t('common.app-name') }}
        </p>
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
          to="/api/login"
          external
        />
        <UiAtomsButton
          :text="$t('common.sign-up')"
          to="/api/register"
          variant="accent"
          external
        />
      </template>
      <ClientOnly>
        <UiAtomsButton :before-icon="isDark ? 'ph:moon-bold' : 'ph:sun-bold'" @click="toggleDark" />
      </ClientOnly>
    </div>
  </header>
</template>
