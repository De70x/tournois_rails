<script setup lang="ts">

import {useMatchsStore} from "~/stores/useMatchsStore";
import {type Match, MatchStatuses} from "~/types/Match";
import {useJoueursStore} from "~/stores/useJoueursStore";
import {useStadesStore} from "~/stores/useStadesStore";

const props = defineProps<{
  tableau: number;
}>();

const {$api} = useNuxtApp()
const {matchs, getMatchSuivant, editMatch, getByesNonTermines, getMatchsEnCours} = useMatchsStore($api)
const {getJoueurById, joueurEnAttente} = useJoueursStore($api)
const {stades} = useStadesStore($api)
const modalMatch = ref<Match | null>(null);
const modalStade = ref<Match | null>(null);

const superWinner = ref<undefined | string>(undefined)

const matchsTableau = computed(() => matchs.value.filter(m => m.tableau_final_id === props.tableau))
const stadesDisponibles = computed(() => stades.value.filter(s => !getMatchsEnCours.value.some(m => m.stade_id === s.id)))

const isModalMatch = computed(() => Number.isInteger(modalMatch.value?.id))
const isModalStade = computed(() => Number.isInteger(modalStade.value?.id))


const rounds = computed(() => {
  const maxPhase = Math.max(...matchsTableau.value.map(m => m.phase));
  return Array.from({length: maxPhase + 1}, (_, i) => i);
});


const getMatchesByRound = (round: number) => {
  return matchsTableau.value.filter(m => m.phase === round).sort((m1, m2) => m1.indice! - m2.indice!) || [];
};

const openModal = (match: Match) => {
  if (match.statut === MatchStatuses.INIT && match.joueur1_id !== joueurEnAttente.value?.id && match.joueur2_id !== joueurEnAttente.value?.id) {
    modalStade.value = match
  }
  if (match.statut === MatchStatuses.EN_COURS) {
    modalMatch.value = match;
  }
};

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
  switch (match.statut) {
    case MatchStatuses.INIT:
      if (match.joueur1_id === joueurEnAttente.value?.id || match.joueur2_id === joueurEnAttente.value?.id)
        return 'pointer-events-none opacity-50'
      else
        return ''
    case MatchStatuses.EN_COURS:
      return 'italic'
    case MatchStatuses.TERMINE:
      return 'pointer-events-none opacity-40'
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
  <div v-if="superWinner">YATAAA {{ superWinner }}</div>
  <div v-if="stadesDisponibles.length ===0" class="italic text-red-500">Pas de stade disponible</div>
  <div class="bracket">
    <div v-for="round in rounds" :key="round" class="round">
      <div v-for="match in getMatchesByRound(round)" :key="match.id" class="match" @click="openModal(match)"
           :class="computedClass(match)">
        <div class="player">{{ getJoueurById(match.joueur1_id)?.nom }}</div>
        <div class="font-bold bg-gray-100 py-2" v-if="match.score_1 !== undefined && match.score_2 !== undefined">
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
  cursor: pointer;
}

.player {
  margin: 5px 0;
}
</style>