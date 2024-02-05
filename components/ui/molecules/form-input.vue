<script setup lang="ts">
import { z } from 'zod'

withDefaults(defineProps<{
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  submitText?: string
  submitIcon?: string
  id: string
}>(), {
  type: 'text',
})

const emits = defineEmits<{
  submit: [value: string]
}>()

const model = defineModel<string>({ required: true })

function submit() {
  try {
    z.string().min(1).parse(model.value)
  }
  catch (error) {
    return
  }
  emits('submit', model.value)
  model.value = ''
}
</script>

<template>
  <form
    @submit.prevent="submit"
  >
    <label
      :for="id"
      class="
        focus-within:border-base-600 focus-within:dark:border-base-400
        border-2 border-base-100 bg-base-50 dark:border-base-900 dark:bg-base-950
        rounded-lg p-2 pl-4 pt-4 outline-none w-full flex flex-col items-end gap-2
      "
    >
      <span v-if="label" class="font-medium">{{ label }}</span>
      <input
        :id="id"
        v-model="model"
        :type="type"
        class="w-full bg-transparent outline-none"
        autocomplete="off"
      >
      <UiAtomsButton
        v-if="submitText || submitIcon"
        :text="submitText"
        :after-icon="submitIcon"
        type="submit"
        variant="accent"
      />
    </label>
  </form>
</template>
