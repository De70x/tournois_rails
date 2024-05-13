<script setup lang="ts">
import {user, type User} from "~/types/User";
import type {FormSubmitEvent} from "#ui/types";

const props = defineProps({
  btnText: String,
  fallbackLink: String,
  fallbackText: String,
  apiUrl: {type: String, required: true},
  redirectUrl: {type: String, required: true},
});

const router = useRouter();
const {$api} = useNuxtApp()

const state = reactive({
  email: undefined,
  password: undefined
})

const handleSubmit = async (event: FormSubmitEvent<User>) => {
  try {
    const response = await $api.post(props.apiUrl, {user: event.data});
    // Redirect the user to the sign-in page after successful sign-up
    await router.push(props.redirectUrl);
  } catch (error) {
    console.error('Sign-up error:', error);
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
            to=`${fallbackLink}`
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          C'est par ici
        </ULink>
      </span>
    </UForm>
  </UCard>
</template>

<style scoped>

</style>