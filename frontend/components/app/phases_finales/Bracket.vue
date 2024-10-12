<script setup lang="ts">

import {useMatchsStore} from "~/stores/useMatchsStore";
import {type Match, MatchStatuses} from "~/types/Match";
import {useJoueursStore} from "~/stores/useJoueursStore";

const props = defineProps<{
  tableau: number;
}>();

const {$api} = useNuxtApp()
const {getMatchsTableau, getMatchSuivant, editMatch, getByesNonTermines} = useMatchsStore($api)
const {getJoueurById} = useJoueursStore($api)
const modalMatch = ref<Match | null>(null);

const isModalMatch = computed(() => Number.isInteger(modalMatch.value?.id))

const matchs = getMatchsTableau.value(props.tableau)

const rounds = computed(() => {
  const maxPhase = Math.max(...matchs.map(m => m.phase));
  return Array.from({length: maxPhase + 1}, (_, i) => i);
});


const getMatchesByRound = (round: number) => {
  return matchs.filter(m => m.phase === round).sort((m1, m2) => m1.indice! - m2.indice!) || [];
};

const openScoreModal = (match: Match) => {
  modalMatch.value = match;
};

const updateScore = () => {
  if (modalMatch.value) {
    const matchSuivant = getMatchSuivant.value(modalMatch.value!)
    const gagnant = modalMatch.value.score_1 > modalMatch.value.score_2 ? modalMatch.value.joueur1_id : modalMatch.value.joueur2_id
    if (modalMatch.value.indice! % 2 === 0) {
      matchSuivant!.joueur1_id = gagnant;
    } else {
      matchSuivant!.joueur2_id = gagnant;
    }
    editMatch(matchSuivant!)
    editMatch({...modalMatch.value, statut: MatchStatuses.TERMINE})
    modalMatch.value = null
  }
}

getByesNonTermines.value.forEach(m => {
  const matchSuivant = getMatchSuivant.value(m)
  if (m.indice! % 2 === 0) {
    matchSuivant!.joueur1_id = m.joueur1_id;
  } else {
    matchSuivant!.joueur2_id = m.joueur1_id;
  }
  editMatch({...m, statut: MatchStatuses.TERMINE})
  editMatch(matchSuivant!)
})
</script>

<template>
  <div class="bracket">
    <div v-for="round in rounds" :key="round" class="round">
      <div v-for="match in getMatchesByRound(round)" :key="match.id" class="match" @click="openScoreModal(match)">
        <div class="player">{{ getJoueurById(match.joueur1_id)?.nom }}</div>
        <div class="score" v-if="match.score_1 !== undefined && match.score_2 !== undefined">
          {{ match.score_1 }} - {{ match.score_2 }}
        </div>
        <div class="player">{{ getJoueurById(match.joueur2_id)?.nom }}</div>
      </div>
    </div>
  </div>

  <UModal v-model="isModalMatch">
    <template v-if="modalMatch">
      <h3>Enter Score</h3>
      <p>{{ modalMatch.joueur1_id }} vs {{ modalMatch.joueur2_id }}</p>
      <UInput v-model="modalMatch.score_1" type="number"/>
      <UInput v-model="modalMatch.score_2" type="number"/>
      <UButton @click="updateScore">Save</UButton>
    </template>
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
  padding: 10px;
  margin: 5px;
  cursor: pointer;
}

.player {
  margin: 5px 0;
}

.score {
  font-weight: bold;
}
</style>