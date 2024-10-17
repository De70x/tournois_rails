<script setup lang="ts">
import type {HorizontalNavigationLink} from "#ui/types";
import {useTournoisStore} from "~/stores/useTournoisStore";
import {computedAsync} from "@vueuse/core";

const {$api} = useNuxtApp()
const token = computed(() => useCookie('auth-token').value);
const {tournoiActif} = useTournoisStore($api)
const {hasPermission} = usePermissions()
const hasPerm = computedAsync(async () => await hasPermission('edit'), false)

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});
const horizontalLinks = computed(() => {
  const dynamicLinks: HorizontalNavigationLink[] = [
    {
      label: 'Accueil',
      icon: 'i-heroicons-home',
      to: '/tournoi/liste'
    }
  ];

  if (tournoiActif.value) {
    dynamicLinks.push({
      label: 'Tournoi en cours',
      icon: 'i-heroicons-beaker',
      to: '/tournoi/detail'
    })

    if (hasPerm.value) {
      dynamicLinks.push({
            label: 'Matchs en cours',
            icon: 'i-heroicons-play-circle',
            to: '/tournoi/match/liste'
          },
          {
            label: 'Gestion',
            icon: 'i-heroicons-cog-6-tooth',
            to: '/gestion'
          })
    }

    dynamicLinks.push({
      label: 'Phases finales',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/phases_finales'
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
const verticalLinks = [...horizontalLinks.value];
</script>

<template>
  <UContainer class="w-full flex items-center justify-between">
    <UButton @click="toggleMenu()" class="block md:hidden">
      <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'" class="w-4 h-4 mt-1"/>
    </UButton>
    <div class="hidden md:flex">
      <UHorizontalNavigation :links="horizontalLinks"/>
    </div>
    <div v-if="isMenuOpen" class="flex flex-col md:hidden absolute top-10 z-10 left-1/2 transform -translate-x-1/2 p-4 items-center">
      <UVerticalNavigation :links="verticalLinks"/>
    </div>
    <div class="flex items-center justify-center gap-2">
      <UToggle v-model="isDark" on-icon="i-heroicons-moon" off-icon="i-heroicons-sun" size="lg"/>
    </div>
  </UContainer>
</template>