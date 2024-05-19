<script setup lang="ts">
import {useAuthStore} from "~/store/auth_store";

const authStore = useAuthStore()
const token = computed(() => {
  return authStore.authToken
})

const links: any[] = []

if (token) {
  links.push({
    label: 'Log-out',
    icon: 'i-heroicons-user-minus',
    to: '/deconnexion'
  })
} else {
  links.push({
    label: 'Log-in',
    icon: 'i-heroicons-home',
    to: '/connexion'
  })
}

links.push({
  label: 'Utilisateurs',
  icon: 'i-heroicons-command-line',
  to: '/users'
})


</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
</template>