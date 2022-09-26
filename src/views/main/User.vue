<template>
  <div class="p-5 xl:px-0">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      <AuthUser class="p-5 bg-white border rounded shadow" />
      <AuthUserForm class="p-5 bg-white border rounded shadow" />
      <UpdatePassword class="p-5 bg-white border rounded shadow" />
      <FileUpload
        label="Upload Avatar"
        :fileTypes="['image/*']"
        endpoint="/users/auth/avatar"
        @fileUploaded="updateUser"
        class="p-5 bg-white border rounded shadow"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserView',
}
</script>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

import AuthUser from '@/components/main_layout/AuthUser.vue'
import FileUpload from '@/components/main_layout/FileUpload.vue'
import AuthUserForm from '@/components/main_layout/AuthUserForm.vue'
import UpdatePassword from '@/components/main_layout/UpdatePassword.vue'

const store = useAuthStore()

const updateUser = () => {
  store.getAuthUser()
}
</script>
