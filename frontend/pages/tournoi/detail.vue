<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
import ListeJoueursSansPoule from "~/components/app/joueur/ListeJoueursSansPoule.vue";
import ListePoules from "~/components/app/poule/ListePoules.vue";

definePageMeta({
  name: 'Detail_Tournoi'
})

const tournoisStore = useTournoisStore()

if (!tournoisStore.tournoiActif.id) {
  navigateTo({name: 'Liste_Tournois'})
}
else{
  // refresh data
  tournoisStore.setActif(tournoisStore.tournoiActif.id)
}

</script>

<template>
  <h1 class="text-xl">{{ tournoisStore.tournoiActif.nom }} | {{ tournoisStore.tournoiActif.annee }}</h1>
  <div class="grid grid-cols-[300px_minmax(500px,_1fr)] gap-10 w-full p-10">
    <ListeJoueursSansPoule/>
    <ListePoules/>
  </div>
</template>

<style scoped>

</style>