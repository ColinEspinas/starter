<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: `${t('common.app-name')} - ${t('subscribe.meta.title')}`,
  description: t('home.meta.description'),
})
</script>

<template>
  <div class="flex flex-col gap-6 w-full mx-auto max-w-[600px] py-10 px-5">
    <AppOrganismsHeader />
    <main class="flex flex-col gap-4">
      <AppMoleculesSubscriptionTable />
    </main>
  </div>
</template>
