<script setup lang="ts">

import {generateBracket} from "~/utils/phasesFinales";
import type {Bracket, PlayerPF} from "~/types/PhasesFinales";
import {useMatchsStore} from "~/store/matchs_store";
import type {Match} from "~/types/Match";

const props = defineProps<{
  players: PlayerPF[];
}>();

const {$api} = useNuxtApp()
const {matchs} = useMatchsStore($api)
const bracket = ref<Bracket | null>(null);
const modalMatch = ref<Match | null>(null);

onMounted(() => {
  // Générer le bracket au montage du composant
  generateBracket(props.players);
});

const isModalMatch = computed(() => Number.isInteger(modalMatch.value?.id))

const rounds = computed(() => {
  const maxPhase = Math.max(...matchs.value.map(m => m.phase));
  return Array.from({ length: maxPhase + 1 }, (_, i) => i);
});

const getMatchesByRound = (round: number) => {
  return matchs.value.filter(m => m.phase === round) || [];
};

const openScoreModal = (match: Match) => {
  modalMatch.value = match;
};

const updateScore = (score1: number, score2: number) => {
  if (modalMatch.value) {
    modalMatch.value.score_1 = score1;
    modalMatch.value.score_2 = score2;

    modalMatch.value = null;
  }
};
</script>

<template>
  <div v-if="bracket" class="bracket">
    <div v-for="round in rounds" :key="round" class="round">
      <div v-for="match in getMatchesByRound(round)" :key="match.id" class="match" @click="openScoreModal(match)">
        <div class="player">{{ match.joueur1_id || 'TBD' }}</div>
        <div class="player">{{ match.joueur2_id || 'TBD' }}</div>
        <div class="score" v-if="match.score_1 !== undefined && match.score_2 !== undefined">
          {{ match.score_1 }} - {{ match.score_2 }}
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="isModalMatch">
    <template v-if="modalMatch">
      <h3>Enter Score</h3>
      <p>{{ modalMatch.joueur1_id }} vs {{ modalMatch.joueur2_id }}</p>
      <UInput v-model="modalMatch.score_1" type="number" />
      <UInput v-model="modalMatch.score_2" type="number" />
      <UButton @click="updateScore(modalMatch.score_1!, modalMatch.score_2!)">Save</UButton>
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