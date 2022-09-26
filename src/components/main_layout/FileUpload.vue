<template>
  <form @submit.prevent="uploadFile">
    <div class="mb-4">
      <label for="file" class="sr-only">
        {{ label }}
      </label>
      <input type="file" :accept="fileTypes?.join(',')" @change="fileChange" id="file" />
    </div>
    <BaseBtn text="Upload" />
    <FlashMessage :message="message" :error="error" />
  </form>
</template>

<script lang="ts">
export default {
  name: 'FileUpload',
}
</script>

<script setup lang="ts">
import { ref, Ref } from 'vue'

import BaseBtn from '@/components/main_layout/BaseBtn.vue'
import FlashMessage from '@/components/main_layout/FlashMessage.vue'

import { getError } from '@/utils/helpers'
import FileService from '@/services/FileService'

interface Props {
  fileTypes?: Array<any> | null
  endpoint: string
  label?: string
}

interface Payload {
  file?: FormData
  endpoint?: string
}

const props = withDefaults(defineProps<Props>(), {
  fileTypes: null,
  label: '',
})

const emit = defineEmits(['fileUploaded'])

const file: Ref<string | null> = ref(null)
const message: Ref<string | null> = ref(null)
const error = ref(null)

const clearMessage = () => {
  error.value = null
  message.value = null
}
const fileChange = (event) => {
  clearMessage()
  file.value = event.target.files[0]
}
const uploadFile = () => {
  const payload: Payload = {}
  const formData = new FormData()
  formData.append('file', file.value ? file.value : '')
  payload.file = formData
  payload.endpoint = props.endpoint
  clearMessage()
  FileService.uploadFile(payload)
    .then(() => {
      message.value = 'File uploaded.'
      emit('fileUploaded')
    })
    .catch((catchError) => (error.value = getError(catchError)))
}
</script>
