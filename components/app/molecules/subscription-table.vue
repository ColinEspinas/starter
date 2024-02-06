<script setup lang="ts">
const { t } = useI18n()

const { stripe } = useAppConfig()

const perks = [
  {
    icon: 'ph:infinity-bold',
    text: t('perks.unlimited-tasks'),
  },
  {
    icon: 'ph:check-bold',
    text: t('perks.no-ads'),
  },
]
</script>

<template>
  <article class="flex flex-col gap-2 rounded-xl bg-base-100 dark:bg-base-900 p-5">
    <h2 class="font-bold text-2xl">
      {{ t('perks.title') }}
    </h2>
    <p class="font-medium text-base text-base-600 dark:text-base-300">
      {{ t('perks.description') }}
    </p>
    <ul class="mb-4">
      <li v-for="(perk, index) in perks" :key="index" class="flex items-center gap-2">
        <Icon :name="perk.icon" size="20" class="text-accent-600 dark:text-accent-400 shrink-0" />
        <span class="font-medium text-base text-base-950 dark:text-base-50">{{ perk.text }}</span>
      </li>
    </ul>

    <div class="w-max">
      <UiAtomsButton
        v-if="$auth.loggedIn"
        variant="accent"
        :text="$t('common.subscribe')"
        :to="`/api/subscription?lookup_key=${stripe.subscriptionLookupKey}&user_id=${$auth.user.id}`"
      />
      <UiAtomsButton
        v-else
        :text="$t('common.sign-in-to-subscribe')"
        to="/api/login"
        variant="accent"
        external
      />
    </div>
  </article>
</template>
