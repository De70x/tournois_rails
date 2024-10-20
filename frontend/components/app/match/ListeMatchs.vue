<script setup lang="ts">
import {type Match, MatchStatuses} from "~/types/Match";
import {useMatchsStore} from "~/stores/useMatchsStore";
import {useModaleStore} from "~/stores/useModaleStore";
import {useJoueursStore} from "~/stores/useJoueursStore";
import {computedAsync} from "@vueuse/core";
import {useStadesStore} from "~/stores/useStadesStore";

interface Props {
  matchs: Match[]
}

defineProps<Props>()

const {$api} = useNuxtApp()
const {deleteMatch, editMatch} = useMatchsStore($api)
const {openModale, configModale} = useModaleStore()
const {getJoueurById} = useJoueursStore($api)
const {getNomStadeById} = useStadesStore($api)
const {hasPermission} = usePermissions()

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
    message: `Êtes vous certain de vouloir supprimer le match : ${getJoueurById.value(match.joueur1_id)?.nom} - ${getJoueurById.value(match.joueur2_id)?.nom} ?`
  }, () => deleteMatch(match.id!))
  openModale()
}

const validerMatch = (matchId: number) => {
  editMatch({
    id: matchId,
    score_1: score1.value,
    score_2: score2.value,
    statut: MatchStatuses.TERMINE
  })
  matchEditable.value = -1
}

const hasPerm = computedAsync(async () => await hasPermission('edit'), false)

</script>

<template>
  Liste des Matchs
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
    <UCard v-for="match in matchs">
      <template #header>
        <div class="flex items-center justify-between">
          <UButton v-if="hasPerm" color="primary" variant="ghost" icon="i-heroicons-pencil-20-solid"
                   @click="() => editerMatch(match)"/>
          <div v-else></div>
          <div>
            <span v-if="match.statut === MatchStatuses.EN_COURS">En cours : {{ getNomStadeById(match.stade_id) }}</span>
            <div>
              <span class="font-bold">{{ getJoueurById(match.joueur1_id)?.nom }}</span>
              -
              <span class="font-bold">{{ getJoueurById(match.joueur2_id)?.nom }}</span>
            </div>
          </div>
          <UButton v-if="hasPerm" color="red" variant="ghost" icon="i-heroicons-trash-20-solid"
                   @click="() => supprimerMatch(match)"/>
          <div v-else></div>
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
  <div v-if="matchs.length === 0" class="w-1/2 m-auto">
    <UCard>
      <template #header>
        Aucun match en cours
      </template>
      <template #default>
        <UButton @click="() => navigateTo({name: 'Detail_Tournoi'})">Retour au détail du tournoi</UButton>
      </template>
    </UCard>
  </div>
</template>

<style scoped>

</style>