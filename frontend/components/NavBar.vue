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
  let dynamicLinks: HorizontalNavigationLink[] = [
    {
      label: 'Accueil',
      icon: 'i-heroicons-home',
      to: '/',
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

  dynamicLinks = dynamicLinks.map(d => ({
    ...d,
    click: toggleMenu
  }))

  return dynamicLinks;
});
const verticalLinks = computed(() => [...horizontalLinks.value]);
</script>

<template>
  <UContainer class="w-full flex items-center justify-between relative">
    <UButton @click="toggleMenu()" class="block md:hidden z-99" variant="ghost">
      <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'" class="w-4 h-4 mt-1"/>
    </UButton>
    <div class="hidden md:flex">
      <UHorizontalNavigation :links="horizontalLinks"/>
    </div>
    <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform -translate-x-full"
        enter-to-class="transform translate-x-0"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform translate-x-0"
        leave-to-class="transform -translate-x-full"
    >
      <div v-if="isMenuOpen"
           class="md:hidden fixed inset-y-0 left-0 z-50 min-w-64 bg-white shadow-lg overflow-y-auto">
        <UButton @click="toggleMenu()" class="block md:hidden z-99" variant="ghost">
          <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'" class="w-4 h-4 mt-1"/>
        </UButton>
        <UVerticalNavigation :links="verticalLinks"/>
      </div>
    </Transition>
    <div class="flex items-center justify-center gap-2">
      <UToggle v-model="isDark" on-icon="i-heroicons-moon" off-icon="i-heroicons-sun" size="lg"/>
    </div>
  </UContainer>
</template>