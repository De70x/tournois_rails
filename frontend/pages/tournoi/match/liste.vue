<script setup lang="ts">
import {useMatchsStore} from "~/store/matchs_store";
import {useJoueursStore} from "~/store/joueurs_store";

const matchsStore = useMatchsStore()
const joueursStore = useJoueursStore()
const getNomJoueur = (id: number) => {
  return joueursStore.joueurs.find(j => j.id === id)!.nom
}
</script>

<template>
  <div v-for="match in matchsStore.getMatchsEnCours">
    {{ getNomJoueur(match.joueur1_id) }} VS {{ getNomJoueur(match.joueur2_id) }}
  </div>
</template>

<style scoped>

</style>