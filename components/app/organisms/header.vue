<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header v-if="$auth.loggedIn" class="flex justify-between items-center border-2 dark:border-base-900 border-base-100 p-2 rounded-xl">
    <div class="flex gap-2 items-center">
      <AppMoleculesMenu />
      <p class="font-medium">
        {{ `${$auth.user.given_name} ${$auth.user.family_name[0]}.` }}
      </p>
    </div>
    <div class="flex gap-2">
      <UiAtomsButton
        to="/api/logout"
        external
        variant="accent"
        :text="$t('common.sign-out')"
      />
      <UiAtomsButton before-icon="ph:moon-bold" @click="toggleDark" />
    </div>
  </header>
  <header v-else class="flex justify-between items-center border-2 dark:border-base-900 border-base-100 p-2 rounded-xl">
    <div class="flex gap-2 items-center">
      <p class="font-medium ml-1">
        {{ $t('common.app-name') }}
      </p>
    </div>
    <div class="flex gap-2">
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
      <UiAtomsButton before-icon="ph:moon-bold" @click="toggleDark" />
    </div>
  </header>
</template>
