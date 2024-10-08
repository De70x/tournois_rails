<script setup lang="ts">
import type {Tableau} from "~/types/Tableau";
import Bracket from "~/components/app/phases_finales/Bracket.vue";

interface IProps {
  tableau: Tableau
}

defineProps<IProps>()

</script>

<template>
  <div>{{ tableau.nom }}</div>
  <Bracket :tableau="tableau.id!"/>
</template>

<style scoped>

</style>