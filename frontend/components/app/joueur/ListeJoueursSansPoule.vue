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
const joueursSansPoule = computed(() => joueursStore.getJoueursSansPoules)

const creationJoueur = () => {
  formState.id = -1
  formState.nom = ''
  creationJoueurEnCours.value = true
}

const creationTerminee = async (event: FormSubmitEvent<Joueur>) => {
  if (event.data.id === -1) {
    await joueursStore.createJoueur({
      nom: event.data.nom!,
      tournoi_id: tournoisStore.tournoiActif.id!
    })
  } else {
    await joueursStore.editJoueur({
      id: event.data.id,
      nom: event.data.nom!,
      tournoi_id: tournoisStore.tournoiActif.id!
    })
  }
  creationJoueurEnCours.value = false
}

const editerJoueur = (joueur: Joueur) => {
  formState.id = joueur.id!
  formState.nom = joueur.nom
  creationJoueurEnCours.value = true
}

const supprimerJoueur = async (id: number) => {
  await joueursStore.deleteJoueur(id)
}

const tirageAuSort = () => {
  let joueursRestants = [...joueursSansPoule.value]
  while (joueursRestants.length !== 0) {
    tournoisStore.tournoiActif.poules.forEach((p) => {
      // On prend un joueur au hasard
      let randomPlayer = joueursRestants[Math.floor(Math.random() * joueursRestants.length)]
      // On le retire du tableau
      joueursRestants = joueursRestants.filter(j => j.id !== randomPlayer.id)
      if (randomPlayer) {
        randomPlayer = {
          ...randomPlayer,
          poule_id: p.id!,
        }
        joueursStore.editJoueur(randomPlayer)
      }
    });
  }
}

</script>

<template>
  <div>
    <div class="text-secondary italic">{{ tournoisStore.tournoiActif.joueurs.length }} joueurs inscrits</div>
    <UButton @click="creationJoueur" variant="outline">Créer un joueur</UButton>
    <UForm v-if="creationJoueurEnCours" :state="formState" @submit="creationTerminee">
      <UInput v-model="formState.nom"></UInput>
      <UButton type="submit">Valider</UButton>
    </UForm>
    <div v-for="joueur in joueursSansPoule" @dblclick="editerJoueur(joueur)" class="flex items-center justify-between">
      <div class="truncate" :title="joueur.nom">{{ joueur.nom }}</div>
      <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="supprimerJoueur(joueur.id!)"/>
    </div>
    <UButton v-if="joueursSansPoule.length > 0" @click="tirageAuSort" variant="outline" color="red">Tirage au sort</UButton>
  </div>
</template>

<style scoped>

</style>