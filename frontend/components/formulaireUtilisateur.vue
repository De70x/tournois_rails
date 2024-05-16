<script setup lang="ts">
import {user, type User} from "~/types/User";
import type {FormSubmitEvent} from "#ui/types";
import {useAuthStore} from "~/store/auth_store";

const props = defineProps({
  btnText: String,
  fallbackText: String,
  linkText: String,
  fallbackLink: {type: String, required: true},
  apiUrl: {type: String, required: true},
  redirectUrl: String
});

const router = useRouter();
const {$api} = useNuxtApp()
const authStore = useAuthStore()

const state = reactive({
  email: undefined,
  password: undefined,
})

const handleSubmit = async (event: FormSubmitEvent<User>) => {
  try {
    const response = await $api.post(props.apiUrl, {user: {...event.data, role: 0}});
    const token = response.data.token;

    if (token) {
      authStore.setAuthToken(token);
      const authToken = useCookie('auth-token', {sameSite: 'strict'});
      authToken.value = token
    }

    if (props.redirectUrl) {
      await router.push(props.redirectUrl);
    }
  } catch (error) {
    console.error(error)
  }
};
</script>

<template>
  <UCard class="max-w-sm w-full">
    <UForm :schema="user" :state="state" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email"/>
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password"/>
      </UFormGroup>

      <UButton type="submit">
        {{ btnText }}
      </UButton>
      <br>
      <span>
        {{ fallbackText }}
          <ULink
              :to=fallbackLink
              active-class="text-primary"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
          {{ linkText }}
        </ULink>
      </span>
    </UForm>
  </UCard>
</template>

<style scoped>

</style>