<template>
  <UCard class="max-w-sm w-full">
    <UForm :schema="user" :state="state" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UCard>
</template>


<script setup lang="ts">
import {user, type User} from "~/types/User";
import type {FormSubmitEvent} from "#ui/types";

const router = useRouter();
const {$api} = useNuxtApp()

const state = reactive({
  email: undefined,
  password: undefined
})

const handleSubmit = async (event: FormSubmitEvent<User>) => {
  try {
    const response = await $api.post('/users', {user: event.data});
    console.log('Sign-up response:', response);
    // Redirect the user to the sign-in page after successful sign-up
    await router.push('/connexion');
  } catch (error) {
    console.error('Sign-up error:', error);
  }
};
</script>
