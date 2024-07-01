<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
import ListeJoueursSansPoule from "~/components/app/joueur/ListeJoueursSansPoule.vue";

const tournoisStore = useTournoisStore()

</script>

<template>
  <div class="grid grid-cols-[300px_minmax(500px,_1fr)] gap-2">
    <ListeJoueursSansPoule/>
    <ObjectDetail :object="tournoisStore.tournoiActif" object-type="tournoi" class=""/>
  </div>
</template>

<style scoped>

</style>