<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";

const tournoiStore = useTournoisStore()
tournoiStore.fetchTournois()

</script>

<template>
  <p>Liste des tournois</p>
  <p v-for="tournoi in tournoiStore.tournois">
    {{ tournoi.nom }} | {{ tournoi.annee }}
  </p>
</template>