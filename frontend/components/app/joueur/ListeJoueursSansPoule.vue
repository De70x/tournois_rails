<script setup lang="ts">
import type {FormSubmitEvent} from '#ui/types'
import {useTournoisStore} from "~/store/tournois_store";
import {useJoueursStore} from "~/store/joueurs_store";
import type {Joueur} from "~/types/Joueur";

const tournoisStore = useTournoisStore()
const joueursStore = useJoueursStore()

const creationJoueurEnCours = ref(false)
const formState = reactive({
  id: -1,
  nom: ""
})
const joueursSansPoule = computed(() => tournoisStore.tournoiActif.joueurs.filter(j => j.poule_id == null))

const creationJoueur = () => {
  creationJoueurEnCours.value = true
}

const creationTerminee = async (event: FormSubmitEvent<Partial<Joueur>>) => {
  if (event.data.id === -1) {
    await joueursStore.createJoueur({
      nom: event.data.nom!,
      tournoi_id: tournoisStore.tournoiActif.id!
    })
  } else {
    await joueursStore.editJoueur({
      id: event.data.id,
      nom: event.data.nom!
    })
  }
  creationJoueurEnCours.value = false
}

const editerJoueur = (joueur: Joueur) => {
  console.log(joueur)
  formState.id = joueur.id!
  formState.nom = joueur.nom
  creationJoueurEnCours.value = true
}

const supprimerJoueur = async (id: number) => {
  await joueursStore.deleteJoueur(id)
}

</script>

<template>
  <div>
    <UButton @click="creationJoueur" variant="outline">Créer un joueur</UButton>
    <UForm v-if="creationJoueurEnCours" :state="formState" @submit="creationTerminee">
      <UInput v-model="formState.nom"></UInput>
      <UButton type="submit">Valider</UButton>
    </UForm>
    <div v-for="joueur in joueursSansPoule" @dblclick="editerJoueur(joueur)" class="flex items-center justify-evenly">
      <div>{{ joueur.nom }}</div>
      <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="supprimerJoueur(joueur.id!)"/>
    </div>
  </div>
</template>

<style scoped>

</style>