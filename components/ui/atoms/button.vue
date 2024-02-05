<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
  afterIcon?: string
  beforeIcon?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'base' | 'accent'
  to?: string
  target?: '_blank' | '_self'
}>(), {
  type: 'button',
  disabled: false,
  variant: 'base',
})

const emits = defineEmits<{
  click: []
}>()

const variantClasses = {
  base: 'border-base-200 bg-base-100 text-base-950 dark:border-base-800 dark:bg-base-900 dark:text-base-50',
  accent: 'dark:border-accent-500 bg-accent-600 text-base-50 border-accent-700',
}
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="font-medium py-1 px-2 rounded-lg border-2 flex gap-2 items-center"
    :class="variantClasses[variant]"
    :target="target"
  >
    <Icon v-if="beforeIcon" class="my-1" :name="beforeIcon" />
    <span v-if="text">{{ text }}</span>
    <Icon v-if="afterIcon" class="my-1" :name="afterIcon" />
  </NuxtLink>
  <button
    v-else
    class="font-medium py-1 px-2 rounded-lg border-2 flex gap-2 items-center"
    :disabled="disabled"
    :class="variantClasses[variant]"
    :type="type"
    @click="emits('click')"
  >
    <Icon v-if="beforeIcon" class="my-1" :name="beforeIcon" />
    <span v-if="text">{{ text }}</span>
    <Icon v-if="afterIcon" class="my-1" :name="afterIcon" />
  </button>
</template>
