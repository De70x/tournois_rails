<script setup lang="ts">
import { computed } from 'vue';

const token = computed(() => useCookie('authToken').value);

const links = computed(() => {
  const dynamicLinks = [
    {
      label: 'Utilisateurs',
      icon: 'i-heroicons-command-line',
      to: '/users'
    },
    {
      label: 'Présentation',
      icon: 'i-heroicons-home',
      to: '/presentation'
    }
  ];

  if (token.value) {
    dynamicLinks.unshift({
      label: 'Log-out',
      icon: 'i-heroicons-user-minus',
      to: '/deconnexion'
    });
  } else {
    dynamicLinks.unshift({
      label: 'Log-in',
      icon: 'i-heroicons-home',
      to: '/connexion'
    });
  }

  return dynamicLinks;
});
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
