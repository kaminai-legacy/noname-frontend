<template>
  <div>
    <transition-group name="fade">
      <p v-if="message" class="mt-2 text-sm text-green-500" key="message">
        {{ message }}
      </p>
      <p v-if="error && getType(error) === 'string'" key="error" class="mt-2 text-sm text-red-500">
        {{ error }}
      </p>
      <ul v-if="getType(error) === 'object'" class="mt-2 text-sm text-red-500" key="error-list">
        <li v-for="key in errorKeys" :key="key">
          <b class="font-bold capitalize">{{ titleCase(key) }}</b>
          <ul class="ml-2">
            <li v-for="(item, index) in getErrors(key)" :key="`${index}-error`">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </transition-group>
  </div>
</template>

<script lang="ts">
  export default {
    name: "FlashMessage",
  };
  </script>

<script setup lang="ts">
  import {computed} from 'vue'

interface Props {
  message?: string | null
  error?: object | string | null
}

const props = withDefaults(defineProps<Props>(), {
  message: null,
  error: null,
})

const errorKeys = computed(() => {
  if (!props.error || getType(props.error) === "string") {
        return null;
      }
      return Object.keys(props.error);
})

const getErrors = (key) => {
      return props.error && props.error[key];
    }
    const getType = (obj) => {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }

const titleCase = (value) => {
  return value.replace("_", " ");
}
</script>
