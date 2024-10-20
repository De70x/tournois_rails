<script setup lang="ts">
import {useTournoisStore} from "~/stores/useTournoisStore";
import ListeJoueursSansPoule from "~/components/app/joueur/ListeJoueursSansPoule.vue";
import ListePoules from "~/components/app/poule/ListePoules.vue";

definePageMeta({
  name: 'Detail_Tournoi'
})
const {$api} = useNuxtApp()
const tournoisStore = useTournoisStore($api)

onMounted(async () => {
  await tournoisStore.initTournoiActif()
})

</script>

<template>
  <TournoiGuard>
    <h1 class="text-xl">{{ tournoisStore.tournoiActif.value?.nom }} | {{ tournoisStore.tournoiActif.value?.annee }}</h1>
    <div class="flex gap-20">
      <ListeJoueursSansPoule/>
      <ListePoules/>
    </div>
  </TournoiGuard>
</template>

<style scoped>

</style>