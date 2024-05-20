<script setup lang="ts">
import {useAuthStore} from "~/store/auth_store";

const token = useCookie('authToken')

const links: any[] = []

if (token.value) {
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
}, {
  label: 'Présentation',
  icon: 'i-heroicons-home',
  to: '/presentation'
})



</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
</template>