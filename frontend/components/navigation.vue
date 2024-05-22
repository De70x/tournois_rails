<script setup lang="ts">
import {computed} from 'vue';
import {useAuthStore} from "~/store/auth_store";
import type {HorizontalNavigationLink} from "#ui/types";

const token = computed(() => useCookie('auth-token', {sameSite: 'strict'}).value);
const email = computed(() => useAuthStore().user?.email)

const links = computed(() => {
  const dynamicLinks: HorizontalNavigationLink[] = [
    {
      label: 'Accueil',
      icon: 'i-heroicons-home',
      to: '/'
    },
    {
      label: 'Présentation',
      icon: 'i-heroicons-beaker',
      to: '/presentation'
    }
  ];

  if (email.value) {
    dynamicLinks.unshift({
      label: email.value,
      icon: 'i-heroicons-user',
      to: '/users'
    })
  }

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
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800 fixed top-0"/>
</template>
