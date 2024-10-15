<script setup lang="ts">
import ListeMatchs from "~/components/app/match/ListeMatchs.vue";
import {useMatchsStore} from "~/stores/useMatchsStore";

definePageMeta({
  name: 'Liste_Matchs_En_Cours'
})
const {$api} = useNuxtApp()
const {getMatchsEnCours} = useMatchsStore($api)
const matchs = getMatchsEnCours.value.filter(m => m.phase === -1)
</script>

<template>
  <TournoiGuard>
    <ListeMatchs :matchs="matchs"/>
  </TournoiGuard>
</template>

<style scoped>

</style>