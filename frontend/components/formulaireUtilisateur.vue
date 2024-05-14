<script setup lang="ts">
import {user, type User} from "~/types/User";
import type {FormSubmitEvent} from "#ui/types";

const props = defineProps({
  btnText: String,
  fallbackText: String,
  apiUrl: {type: String, required: true},
  redirectUrl: {type: String, required: true},
});

const router = useRouter();
const {$api} = useNuxtApp()

const state = reactive({
  email: undefined,
  password: undefined,
  errors: []
})

const handleSubmit = async (event: FormSubmitEvent<User>) => {
  try {
    await $api.post(props.apiUrl, {user: event.data});
    await router.push(props.redirectUrl);
  } catch (error) {
    console.error(error);
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
        <slot/>
      </span>
    </UForm>
  </UCard>
</template>

<style scoped>

</style>