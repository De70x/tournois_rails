<script setup lang="ts">

import {generateBracket} from "~/utils/phasesFinales";
import type {Bracket, MatchPF, PlayerPF} from "~/types/PhasesFinales";

const props = defineProps<{
  players: PlayerPF[];
}>();

const bracket = ref<Bracket | null>(null);
const modalMatch = ref<MatchPF | null>(null);

onMounted(() => {
  // Générer le bracket au montage du composant
  // bracket.value = generateBracket(props.players);
});

const isModalMatch = computed(() => Number.isInteger(modalMatch.value?.id))

const rounds = computed(() => {
  if (!bracket.value) return [];
  const maxPhase = Math.max(...bracket.value.matches.map(m => m.phase));
  return Array.from({ length: maxPhase + 1 }, (_, i) => i);
});

const getMatchesByRound = (round: number) => {
  return bracket.value?.matches.filter(m => m.phase === round) || [];
};

const openScoreModal = (match: MatchPF) => {
  modalMatch.value = match;
};

const updateScore = (score1: number, score2: number) => {
  if (modalMatch.value && bracket.value) {
    modalMatch.value.score1 = score1;
    modalMatch.value.score2 = score2;

    // Propagate winner to next match
    const nextMatch = bracket.value.matches.find(m => m.id === modalMatch.value?.nextMatchId);
    if (nextMatch) {
      const winner = score1 > score2 ? modalMatch.value.player1 : modalMatch.value.player2;
      if (!nextMatch.player1) {
        nextMatch.player1 = winner;
      } else {
        nextMatch.player2 = winner;
      }
    }

    modalMatch.value = null;
  }
};
</script>

<template>
  <div v-if="bracket" class="bracket">
    <div v-for="round in rounds" :key="round" class="round">
      <div v-for="match in getMatchesByRound(round)" :key="match.id" class="match" @click="openScoreModal(match)">
        <div class="player">{{ match.player1?.name || 'TBD' }}</div>
        <div class="player">{{ match.player2?.name || 'TBD' }}</div>
        <div class="score" v-if="match.score1 !== undefined && match.score2 !== undefined">
          {{ match.score1 }} - {{ match.score2 }}
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="isModalMatch">
    <template v-if="modalMatch">
      <h3>Enter Score</h3>
      <p>{{ modalMatch.player1?.name }} vs {{ modalMatch.player2?.name }}</p>
      <UInput v-model="modalMatch.score1" type="number" />
      <UInput v-model="modalMatch.score2" type="number" />
      <UButton @click="updateScore(modalMatch.score1!, modalMatch.score2!)">Save</UButton>
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