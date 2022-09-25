<template>
  {{fields.name}}
  <form @submit.prevent="registerUser">
    <BaseInput type="text" label="Name" name="name" :value="fields.name" @input="fields.name = $event" placeholder="Luke" class="mb-2" />
    <BaseInput type="email" label="Email" name="email" v-model="fields.email" placeholder="luke@jedi.com"
      class="mb-2" />
    <BaseInput type="password" label="Password" name="password" v-model="fields.password" class="mb-2" />
    <BaseInput type="password" label="Confirm Password" name="password-confirm" v-model="fields.passwordConfirm"
      class="mb-4" />
    <BaseBtn type="submit" text="Register" />
    <FlashMessage :error="error" />
  </form>
</template>

<script lang="ts">
export default {
  name: "RegisterForm",
};
</script>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import BaseBtn from "@/components/main_layout/BaseBtn.vue";
import BaseInput from "@/components/main_layout/BaseInput.vue";
import FlashMessage from "@/components/main_layout/FlashMessage.vue";

import { getError } from "@/utils/helpers";
import AuthService from "@/services/AuthService";

const router = useRouter()

const error = ref(null)
const some = ref('')

interface Fields {
  name: string|number|undefined
  email: string|number|undefined
  password: string|number|undefined
  passwordConfirm: string|number|undefined
}

const fields = reactive<Fields>({
  name: '1111',
  email: '',
  password: '',
  passwordConfirm: '',
})

const { name, email, password, passwordConfirm } = toRefs(fields)

console.log(fields)
console.log(Object.keys(fields))
console.log(Object.values(fields))
console.log(fields.name)
console.log(name)

const registerUser = () => {
  error.value = null;
  fields.name = 2222
  const payload = {
    name: fields.name,
    email: fields.email,
    password: fields.password,
    password_confirmation: fields.passwordConfirm,
  };
  AuthService.registerUser(payload)
    .then(() => router.push("/dashboard"))
    .catch((catchError) => (error.value = getError(catchError)));
}
</script>
