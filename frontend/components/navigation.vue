<script setup lang="ts">
const links = [{
  label: 'Profile',
  avatar: {
    src: '/tennis.png'
  },
  to: '/'
}, {
  label: 'Log-in',
  icon: 'i-heroicons-home',
  to: '/connexion'
}, {
  label: 'Utilisateurs',
  icon: 'i-heroicons-command-line',
  to: '/users'
}]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
</template>