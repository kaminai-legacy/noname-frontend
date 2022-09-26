<template>
  <div>
    <label
      :for="name"
      class="text-sm text-gray-500"
      :class="{ 'sr-only': !showLabel }"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :type="type"
      :required="required"
      v-model="value"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseInput',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  name: string
  label?: string
  type?: string
  showLabel?: boolean
  required?: boolean
  placeholder?: string
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  type: 'text',
  showLabel: true,
  required: false,
  value: '',
})

const emit = defineEmits(['update:modelValue' /*, 'input'*/])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// const updateValue = (event) => {
//   return emit('update:modelValue', event.target.value)
//   return emit('input', event.target.value)
// }
</script>
