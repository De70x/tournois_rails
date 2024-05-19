<script setup lang="ts">
import {user, type User} from "~/types/User";
import type {FormSubmitEvent} from "#ui/types";
import {useAuthStore} from "~/store/auth_store";

const props = defineProps({
  typeFormulaire: String,
});

let btnText = ''
let fallbackText = ''
let linkText = ''
let fallbackLink = ''
let redirectUrl = ''

if (props.typeFormulaire === 'connexion') {
  btnText = 'Connexion'
  fallbackText = 'Pas encore de compte ?'
  linkText = 'Inscription'
  fallbackLink = '/inscription'
  redirectUrl = '/users'
}
if (props.typeFormulaire === 'inscription') {
  btnText = 'Inscription'
  fallbackText = 'Déjà un compte ?'
  linkText = 'Connexion'
  redirectUrl = '/connexion'
  fallbackLink = '/connexion'
}

const router = useRouter();
const authStore = useAuthStore()

const state = reactive({
  email: undefined,
  password: undefined,
})

const handleSubmit = async (event: FormSubmitEvent<User>) => {
  if (props.typeFormulaire === 'connexion') {
    await authStore.login(event.data)
  }

  if (props.typeFormulaire === 'inscription') {
    await authStore.signup(event.data)
  }

  if (redirectUrl) {
    await router.push(redirectUrl);
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