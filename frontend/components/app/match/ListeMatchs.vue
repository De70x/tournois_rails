<script setup lang="ts">
import type {Match} from "~/types/Match";
import {useMatchsStore} from "~/store/matchs_store";
import {useModaleStore} from "~/store/modale_store";
import {useJoueur} from "~/composables/useJoueur";

const matchsStore = useMatchsStore()
const {openModale, configModale} = useModaleStore()
const {getNomJoueurById} = useJoueur()

const matchEditable = ref(-1)
const score1 = ref(0)
const score2 = ref(0)

const editerMatch = (match: Match) => {
  matchEditable.value = match.id!
  score1.value = match.score_1
  score2.value = match.score_2
}

const supprimerMatch = (match: Match) => {
  configModale({
    id: match.id!,
    message: `Êtes vous certain de vouloir supprimer le match : ${getNomJoueurById(match.joueur1_id)} - ${getNomJoueurById(match.joueur2_id)} ?`
  }, () => matchsStore.deleteMatch(match.id!))
  openModale()
}

const validerMatch = (matchId: number) => {
  matchsStore.editMatch({
    id: matchId,
    score_1: score1.value,
    score_2: score2.value,
    statut: 'termine'
  })
  matchEditable.value = -1
}

</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <UCard v-for="match in matchsStore.getMatchsEnCours">
      <template #header>
        <div class="flex items-center justify-between">
          <UButton color="primary" variant="ghost" icon="i-heroicons-pencil-20-solid"
                   @click="() => editerMatch(match)"/>
          <div><span class="font-bold">{{ getNomJoueurById(match.joueur1_id) }}</span> - <span class="font-bold">{{ getNomJoueurById(match.joueur2_id) }}</span></div>
          <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid"
                   @click="() => supprimerMatch(match)"/>
        </div>
      </template>
      <template #default>
        <div v-if="matchEditable === match.id" class="grid grid-cols-3 text-center">
          <UInput v-model="score1"/>
          -
          <UInput v-model="score2"/>
          <UButton @click="() => validerMatch(match.id!)" class="col-span-1 col-start-2 m-auto">Valider</UButton>
        </div>
        <div v-else>{{ match.score_1 }} - {{ match.score_2 }}</div>
      </template>
    </UCard>
  </div>
</template>

<style scoped>

</style>