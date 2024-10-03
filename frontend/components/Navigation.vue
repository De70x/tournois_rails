<script setup lang="ts">
import {computed} from 'vue';
import {useAuthStore} from "~/stores/useAuthStore";
import type {HorizontalNavigationLink} from "#ui/types";

const {$api} = useNuxtApp()
const token = computed(() => useCookie('auth-token').value);
const email = computed(() => useAuthStore($api).user?.value?.email)

const links = computed(() => {
  const dynamicLinks: HorizontalNavigationLink[] = [
    {
      label: 'Accueil',
      icon: 'i-heroicons-home',
      to: '/tournoi/liste'
    },{
      label: 'Tournoi en cours',
      icon: 'i-heroicons-beaker',
      to: '/tournoi/detail'
    },{
      label: 'Matchs en cours',
      icon: 'i-heroicons-play-circle',
      to: '/tournoi/match/liste'
    },{
      label: 'Gestion',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/gestion'
    },{
      label: 'Phases finales',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/phases_finales'
    }

  ];

  if (email.value) {
    dynamicLinks.unshift({
      label: email.value,
      icon: 'i-heroicons-user',
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
      label: 'Connexion',
      icon: 'i-heroicons-home',
      to: '/connexion'
    });
  }

  return dynamicLinks;
});
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
</template>
