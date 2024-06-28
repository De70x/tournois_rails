<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
import ListeJoueursSansPoule from "~/components/app/joueur/ListeJoueursSansPoule.vue";

const tournoisStore = useTournoisStore()

</script>

<template>
  <ListeJoueursSansPoule/>
  <ObjectDetail :object="tournoisStore.tournoiActif" object-type="tournoi"/>
</template>

<style scoped>

</style>