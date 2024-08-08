<script setup lang="ts">
import {useMatchsStore} from "~/store/matchs_store";
import {useJoueursStore} from "~/store/joueurs_store";
import ListeMatchs from "~/components/app/match/ListeMatchs.vue";

const matchsStore = useMatchsStore()

</script>

<template>
  <ListeMatchs/>
</template>

<style scoped>

</style>