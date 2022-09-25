<template>
  <form @submit.prevent="postMessage">
    <BaseInput type="message" label="Message" name="message" v-model="body" class="mb-4" />
    <div class="flex justify-end mb-2">
      <BaseBtn type="submit" text="Message" />
    </div>
    <FlashMessage :error="error" />
  </form>
</template>

<script lang="ts">
export default {
  name: "MessageForm",
};
</script>

<script setup lang="ts">
import { ref } from "vue";

import { useMessageStore } from "@/store/message";

import BaseBtn from "@/components/main_layout/BaseBtn.vue";
import BaseInput from "@/components/main_layout/BaseInput.vue";
import FlashMessage from "@/components/main_layout/FlashMessage.vue";

import { getError } from "@/utils/helpers";

const store = useMessageStore();

const body = ref(null)
const error = ref(null)

const postMessage = async () => {
  try {
    const payload = {
      body: body.value,
    };
    error.value = null;
    await store.postMessage(payload);
    body.value = null;
  } catch (catchError) {
    error.value = getError(catchError);
  }
}
</script>
