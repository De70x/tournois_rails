<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
import {useJoueursStore} from "~/store/joueurs_store";

const tournoisStore = useTournoisStore()
const joueursStore = useJoueursStore()
const creationJoueurEnCours = ref(false)
const nomJoueur = ref("")

const joueursSansPoule = computed(() => tournoisStore.tournoiActif.joueurs.filter(j => j.poule_id == null))

const creationJoueur = () => {
  creationJoueurEnCours.value = true
}

const creationTerminee = async () => {
  console.log(nomJoueur.value)
  await joueursStore.createJoueur({
    nom: nomJoueur.value,
    tournoi_id: tournoisStore.tournoiActif.id!
  })
  creationJoueurEnCours.value = false
}
</script>

<template>
  <div v-for="joueur in joueursSansPoule">
    {{ joueur.nom }}
  </div>
  <UButton @click="creationJoueur">Créer un joueur</UButton>
  <div v-if="creationJoueurEnCours">
    <UInput v-model="nomJoueur"></UInput>
    <UButton @click="creationTerminee">Valider</UButton>
  </div>
</template>

<style scoped>

</style>