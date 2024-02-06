<script setup lang="ts">
const route = useRoute()
const sessionId = route.query.session_id ?? ''
</script>

<template>
  <div class="flex flex-col gap-6 w-full mx-auto max-w-[600px] py-10 px-5">
    <AppOrganismsHeader />
    <main v-if="sessionId" class="flex flex-col gap-4">
      <p class="flex items-center gap-4 bg-base-100 dark:bg-base-900 rounded-xl px-6 py-5 font-medium text-base-950 dark:text-base-50">
        <Icon name="ph:confetti-bold" size="18" class="shrink-0 text-accent-500" />
        <span>{{ $t('subscribe.message.success') }}</span>
      </p>
      <div class="flex gap-2">
        <UiAtomsButton
          before-icon="ph:arrow-left-bold"
          :text="$t('common.go-back')"
          to="/"
          variant="accent"
        />
        <UiAtomsButton
          :text="$t('common.manage-subscription')"
          :to="`/api/subscription/manage?session_id=${sessionId}`"
        />
      </div>
    </main>
  </div>
</template>
