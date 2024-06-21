<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";

const tournoisStore = useTournoisStore()

</script>

<template>
  <ObjectDetail :object="tournoisStore.tournoiActif" object-type="tournoi"/>
</template>

<style scoped>

</style>