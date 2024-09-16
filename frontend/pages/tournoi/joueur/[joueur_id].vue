<script setup lang="ts">
import DetailJoueur from "~/components/app/joueur/DetailJoueur.vue";

definePageMeta({
  name: 'Detail_Joueur'
})

console.log(JSON.stringify(useRoute().params));

</script>

<template>
  <DetailJoueur/>
</template>

<style scoped>

</style>