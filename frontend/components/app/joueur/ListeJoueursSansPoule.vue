<script setup lang="ts">
import type {FormSubmitEvent} from '#ui/types'
import {useTournoisStore} from "~/stores/useTournoisStore";
import {useJoueursStore} from "~/stores/useJoueursStore";
import {type Joueur, JoueurTypes} from "~/types/Joueur";
import {useModaleStore} from "~/stores/useModaleStore";
import {usePoulesStore} from "~/stores/usePoulesStore";

const {$api} = useNuxtApp()
const {tournoiActif} = useTournoisStore($api)
const {getJoueursSansPoules, joueurs, createJoueur, deleteJoueur, editJoueur} = useJoueursStore($api)
const {openModale, configModale} = useModaleStore()
const {poules} = usePoulesStore($api)

const creationJoueurEnCours = ref(false)
const formState = reactive({
  id: -1,
  nom: "",
  poule_id: -1
})
const joueursSansPoule = computed(() => getJoueursSansPoules())

const nombreInscrits = computed(() => joueurs.value.filter(j => j.type_joueur === JoueurTypes.CLASSIQUE).length)


const creationJoueur = () => {
  formState.id = -1
  formState.nom = ''
  formState.poule_id = -1
  creationJoueurEnCours.value = true
}

const creationTerminee = async (event: FormSubmitEvent<Joueur>) => {
  if (tournoiActif.value) {
    if (event.data.id === -1) {
      await createJoueur({
        nom: event.data.nom!,
        tournoi_id: tournoiActif.value.id!
      } as Joueur)
    } else {
      await editJoueur({
        id: event.data.id,
        nom: event.data.nom!,
        poule_id: event.data.poule_id,
        tournoi_id: tournoiActif.value.id!
      })
    }
  }
  creationJoueurEnCours.value = false
}

const editerJoueur = (joueur: Joueur) => {
  formState.id = joueur.id!
  formState.nom = joueur.nom
  formState.poule_id = joueur.poule_id!
  creationJoueurEnCours.value = true
}

const supprimerJoueur = async (joueur: Joueur) => {
  configModale({
    id: joueur.id!,
    message: `Êtes vous certain de vouloir supprimer le joueur ${joueur.nom} ?`
  }, () => deleteJoueur(joueur.id!))
  openModale()
}

const tirageAuSort = () => {
  navigateTo({name: 'Tirage_Au_Sort'})
  let joueursRestants = [...joueursSansPoule.value]
  while (joueursRestants.length !== 0) {
    tournoiActif?.value?.poules.forEach((p) => {
      // On prend un joueur au hasard
      let randomPlayer = joueursRestants[Math.floor(Math.random() * joueursRestants.length)]
      // On le retire du tableau
      joueursRestants = joueursRestants.filter(j => j.id !== randomPlayer.id)
      if (randomPlayer) {
        randomPlayer = {
          ...randomPlayer,
          poule_id: p.id!,
        }
        editJoueur(randomPlayer)
      }
    });
  }
}

</script>

<template>
  <div>
    <div class="text-secondary italic">{{ nombreInscrits }} joueurs inscrits</div>
    <UButton @click="creationJoueur" variant="outline">Créer un joueur</UButton>
    <UForm v-if="creationJoueurEnCours" :state="formState" @submit="creationTerminee">
      <UInput v-model="formState.nom" :autofocus='true'></UInput>
      <UButton type="submit">Valider</UButton>
    </UForm>
    <div v-for="joueur in joueursSansPoule" @dblclick="editerJoueur(joueur)" class="flex items-center justify-between">
      <div class="truncate" :title="joueur.nom">{{ joueur.nom }}</div>
      <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="supprimerJoueur(joueur)"/>
    </div>
    <UButton v-if="joueursSansPoule.length > 0 && poules.length > 0" @click="tirageAuSort" variant="outline" color="red">Tirage au sort
    </UButton>
  </div>
</template>

<style scoped>

</style>