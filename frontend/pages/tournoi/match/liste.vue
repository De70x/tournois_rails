<script setup lang="ts">
import ListeMatchs from "~/components/app/match/ListeMatchs.vue";
import {useMatchsStore} from "~/store/matchs_store";

definePageMeta({
  name: 'Liste_Matchs_En_Cours'
})
const {$api} = useNuxtApp()
const {getMatchsEnCours} = useMatchsStore($api)
</script>

<template>
  <TournoiGuard>
    <ListeMatchs :matchs="getMatchsEnCours"/>
  </TournoiGuard>
</template>

<style scoped>

</style>