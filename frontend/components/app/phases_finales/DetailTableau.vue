<script setup lang="ts">
import type {Tableau} from "~/types/Tableau";
import {useJoueursStore} from "~/stores/useJoueursStore";
import Bracket from "~/components/app/phases_finales/Bracket.vue";
import type {PlayerPF} from "~/types/PhasesFinales";

interface IProps {
  tableau: Tableau
}

const props = defineProps<IProps>()
const {$api} = useNuxtApp()
const {getJoueursParTableau} = useJoueursStore($api)

const joueursPhaseFinale = computed(() => {
  return getJoueursParTableau(props.tableau.id!).map(j => ({
    id: j.id,
    seedPoints: j.points,
    name: j.nom
  } as PlayerPF))
})

</script>

<template>
  <div>{{ tableau.nom }}</div>
  <Bracket :players="joueursPhaseFinale"/>
</template>

<style scoped>

</style>