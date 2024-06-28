<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
  afterIcon?: string
  beforeIcon?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'base' | 'accent'
  align?: 'left' | 'center' | 'right'
  to?: string
  target?: '_blank' | '_self'
  external?: boolean
}>(), {
  type: 'button',
  disabled: false,
  variant: 'base',
  align: 'left',
  external: false,
})

const emits = defineEmits<{
  click: []
}>()

const variantClasses = {
  base: 'border-base-200 bg-base-100 text-base-950 dark:border-base-800 dark:bg-base-900 dark:text-base-50 hover:border-base-400 hover:dark:border-base-600',
  accent: 'dark:border-accent-500 bg-accent-600 text-base-50 border-accent-700 hover:border-accent-400 hover:bg-accent-500',
}

const alignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="transition-colors duration-200 font-medium py-1 px-2 rounded-lg border-2 flex gap-2 items-center outline-none focus:border-base-400 focus:dark:border-base-600"
    :class="[variantClasses[variant], alignClasses[align]]"
    :target="target"
    :external
  >
    <Icon v-if="beforeIcon" class="my-1" :name="beforeIcon" />
    <span v-if="text">{{ text }}</span>
    <Icon v-if="afterIcon" class="my-1" :name="afterIcon" />
  </NuxtLink>
  <button
    v-else
    class="transition-colors duration-200 font-medium py-1 px-2 rounded-lg border-2 flex gap-2 items-center outline-none focus:border-base-400 focus:dark:border-base-600"
    :disabled="disabled"
    :class="[variantClasses[variant], alignClasses[align]]"
    :type="type"
    @click="emits('click')"
  >
    <Icon v-if="beforeIcon" class="my-1" :name="beforeIcon" />
    <span v-if="text">{{ text }}</span>
    <Icon v-if="afterIcon" class="my-1" :name="afterIcon" />
  </button>
</template>
