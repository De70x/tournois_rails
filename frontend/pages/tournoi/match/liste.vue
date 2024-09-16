<script setup lang="ts">
import ListeMatchs from "~/components/app/match/ListeMatchs.vue";
import {useMatchsStore} from "~/store/matchs_store";

definePageMeta({
  name: 'Liste_Matchs_En_Cours'
})

const {getMatchsEnCours} = useMatchsStore()

</script>

<template>
  <ListeMatchs :matchs="getMatchsEnCours" />
</template>

<style scoped>

</style>