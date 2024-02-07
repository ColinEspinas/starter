<script setup lang="ts">
const toggleState = ref(false)
const { t } = useI18n()

const items = [
  {
    text: t('common.manage-subscription'),
    click: async () => await navigateTo('/api/subscription/manage', {
      external: true,
    }),
  },
]
</script>

<template>
  <DropdownMenuRoot v-if="$auth.loggedIn" v-model:open="toggleState">
    <DropdownMenuTrigger aria-label="User Menu">
      <AvatarRoot class="inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <AvatarImage
          class="h-full w-full rounded-[inherit] border-2 dark:border-base-800 border-base-100 object-cover"
          :src="$auth.user.picture ?? ''"
          :alt="`${$auth.user.given_name} ${$auth.user.family_name}`"
        />
        <AvatarFallback
          class="leading-1 flex h-full w-full items-center justify-center bg-accent-400 text-base-50 text-[15px] font-medium"
          :delay-ms="600"
        >
          {{ `${$auth.user.given_name[0]}${$auth.user.family_name[0]}` }}
        </AvatarFallback>
      </AvatarRoot>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="start"
        class="min-w-[220px] outline-none bg-base-100 rounded-xl p-1 border-2 border-base-200 shadow-md dark:border-base-800 dark:bg-base-900"
        :side-offset="3"
        :align-offset="-10"
      >
        <DropdownMenuItem
          v-for="(item, index) in items"
          :key="index"
          :value="item.text"
          class="group select-none flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-base-200 hover:dark:bg-base-800"
          @click="item.click"
        >
          <Icon name="ph:credit-card-bold" size="18" class="text-accent-600 dark:text-accent-400" />
          <span class="font-medium text-sm text-base-950 dark:text-base-50">{{ item.text }}</span>
        </DropdownMenuItem>
        <DropdownMenuArrow class="fill-base-200 dark:fill-base-800" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
