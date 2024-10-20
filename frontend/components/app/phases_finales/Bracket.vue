<script setup lang="ts">

import {useMatchsStore} from "~/stores/useMatchsStore";
import {type Match, MatchStatuses} from "~/types/Match";
import {useJoueursStore} from "~/stores/useJoueursStore";
import {useStadesStore} from "~/stores/useStadesStore";
import {computedAsync} from "@vueuse/core";

const props = defineProps<{
  tableau: number;
}>();

const {$api} = useNuxtApp()
const {matchs, getMatchSuivant, editMatch, getByesNonTermines, getMatchsEnCours} = useMatchsStore($api)
const {getJoueurById, joueurEnAttente, joueurFictif} = useJoueursStore($api)
const {stades, getNomStadeById} = useStadesStore($api)
const {hasPermission} = usePermissions()
const hasPerm = computedAsync(async () => await hasPermission('edit'), false)
const modalMatch = ref<Match | null>(null);
const modalStade = ref<Match | null>(null);

const superWinner = ref<undefined | string>(undefined)

const matchsTableau = computed(() => matchs.value.filter(m => m.tableau_final_id === props.tableau))
const stadesDisponibles = computed(() => stades.value.filter(s => !getMatchsEnCours.value.some(m => Number(m.stade_id) === s.id)))

const isModalMatch = computed(() => Number.isInteger(modalMatch.value?.id))
const isModalStade = computed(() => Number.isInteger(modalStade.value?.id))


const rounds = computed(() => {
  const maxPhase = Math.max(...matchsTableau.value.map(m => m.phase));
  return Array.from({length: maxPhase + 1}, (_, i) => i);
});


const getMatchesByRound = (round: number) => {
  return matchsTableau.value.filter(m => m.phase === round).sort((m1, m2) => m1.indice! - m2.indice!) || [];
};

const dernierMatch = getMatchesByRound(rounds.value.length - 1)[0]

superWinner.value = dernierMatch.statut === MatchStatuses.TERMINE ? dernierMatch.score_1 > dernierMatch.score_2 ? getJoueurById.value(dernierMatch.joueur1_id)?.nom : getJoueurById.value(dernierMatch.joueur2_id)?.nom : undefined

const openModal = (match: Match) => {
  if (hasPerm.value) {
    if (match.statut === MatchStatuses.INIT && match.joueur1_id !== joueurEnAttente.value?.id && match.joueur2_id !== joueurEnAttente.value?.id) {
      modalStade.value = match
    }
    if (match.statut === MatchStatuses.EN_COURS) {
      modalMatch.value = match;
    }
  }
};

const editMatchModal = (match: Match, e: any) => {
  e.preventDefault()
  if (hasPerm.value) {
    const matchSuivant = getMatchSuivant.value(match)
    if (matchSuivant?.statut === MatchStatuses.INIT && match.statut === MatchStatuses.TERMINE && match.joueur2_id !== joueurFictif.value?.id) {
      modalMatch.value = match;
    }
  }
}

const updateScore = () => {
  if (modalMatch.value) {
    const gagnant = modalMatch.value.score_1 > modalMatch.value.score_2 ? modalMatch.value.joueur1_id : modalMatch.value.joueur2_id
    if (modalMatch.value.phase === rounds.value.length - 1) {
      superWinner.value = getJoueurById.value(gagnant)?.nom
    } else {
      const matchSuivant = getMatchSuivant.value(modalMatch.value!)
      if (modalMatch.value.indice! % 2 === 0) {
        matchSuivant!.joueur1_id = gagnant;
      } else {
        matchSuivant!.joueur2_id = gagnant;
      }
      editMatch(matchSuivant!)
    }
    editMatch({...modalMatch.value, statut: MatchStatuses.TERMINE})
    modalMatch.value = null
  }
}

const updateStade = () => {
  if (modalStade.value) {
    editMatch({...modalStade.value, statut: MatchStatuses.EN_COURS})
    modalStade.value = null
  }
}

const computedClass = (match: Match) => {

  if (hasPerm.value) {
    const matchSuivant = getMatchSuivant.value(match)
    if (matchSuivant?.statut === MatchStatuses.INIT && match.statut === MatchStatuses.TERMINE && match.joueur2_id !== joueurFictif.value?.id) {
      return 'italic border border-blue-500 cursor-pointer'
    }
  }

  switch (match.statut) {
    case MatchStatuses.INIT:
      if (match.joueur1_id === joueurEnAttente.value?.id || match.joueur2_id === joueurEnAttente.value?.id)
        return 'match pointer-events-none opacity-50'
      else
        return 'match cursor-pointer'
    case MatchStatuses.EN_COURS:
      return 'italic border border-red-500 cursor-pointer'
    case MatchStatuses.TERMINE:
      return 'match opacity-40 cursor-default'
  }
}

getByesNonTermines.value.forEach(m => {
  const matchSuivant = getMatchSuivant.value(m)
  if (matchSuivant) {
    if (m.indice! % 2 === 0) {
      matchSuivant!.joueur1_id = m.joueur1_id;
    } else {
      matchSuivant!.joueur2_id = m.joueur1_id;
    }
    editMatch({...m, statut: MatchStatuses.TERMINE})
    editMatch(matchSuivant!)
  }
})

</script>

<template>
  <div v-if="superWinner">Nous avons un gagnant : {{ superWinner }}</div>
  <div v-if="stadesDisponibles.length === 0" class="italic text-red-500">Pas de stade disponible</div>
  <div class="bracket">
    <div v-for="round in rounds" :key="round" class="round">
      <div v-for="match in getMatchesByRound(round)"
           :key="match.id"
           @click="openModal(match)"
           :class="computedClass(match)"
           @contextmenu="(e) => editMatchModal(match, e)"
      >
        <div v-if="match.statut === MatchStatuses.EN_COURS">match en cours : {{
            getNomStadeById(Number(match.stade_id))
          }}
        </div>
        <div class="player">{{ getJoueurById(match.joueur1_id)?.nom }}</div>
        <div class="font-bold bg-gray-100 py-2">
          {{ match.score_1 }} - {{ match.score_2 }}
        </div>
        <div class="player">{{ getJoueurById(match.joueur2_id)?.nom }}</div>
      </div>
    </div>
  </div>

  <UModal v-model="isModalMatch" @close="() => modalMatch = null">
    <UCard v-if="modalMatch">
      <h3>Saisir le score</h3>
      <p class="text-center m-2">{{ getJoueurById(modalMatch.joueur1_id)?.nom }} vs
        {{ getJoueurById(modalMatch.joueur2_id)?.nom }}</p>
      <div class="flex justify-between">
        <UInput v-model="modalMatch.score_1" type="number" class="m-2"/>
        <UInput v-model="modalMatch.score_2" type="number" class="m-2"/>
      </div>
      <UButton @click="updateScore" class="w-full m-2">Save</UButton>
    </UCard>
  </UModal>

  <UModal v-model="isModalStade" @close="() => modalStade = null">
    <UCard v-if="modalStade">
      <h3>Choix du stade</h3>
      <p class="text-center m-2">{{ getJoueurById(modalStade.joueur1_id)?.nom }} vs
        {{ getJoueurById(modalStade.joueur2_id)?.nom }}</p>
      <USelect v-if="stadesDisponibles.length > 0" v-model="modalStade.stade_id" :options="stadesDisponibles"
               option-attribute="nom"
               value-attribute="id"
               class="m-2"/>

      <div v-else class="text-red-500 italic">Pas de stades disponibles</div>
      <UButton @click="updateStade" class="w-full m-2">Save</UButton>
    </UCard>
  </UModal>

</template>

<style scoped>
.bracket {
  display: flex;
  overflow-x: auto;
}

.round {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 200px;
}

.match {
  border: 1px solid #ccc;
  margin: 5px;
}

.player {
  margin: 5px 0;
}
</style>