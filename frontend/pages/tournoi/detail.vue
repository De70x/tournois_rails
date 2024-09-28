<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
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
    <div class="grid grid-cols-[300px_minmax(500px,_1fr)] gap-10 w-full p-10">
      <ListeJoueursSansPoule/>
      <ListePoules/>
    </div>
  </TournoiGuard>
</template>

<style scoped>

</style>