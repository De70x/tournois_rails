<script setup lang="ts">
import DetailJoueur from "~/components/app/joueur/DetailJoueur.vue";

definePageMeta({
  name: 'Detail_Joueur'
})

</script>

<template>
  <TournoiGuard>
    <DetailJoueur/>
  </TournoiGuard>
</template>

<style scoped>

</style>