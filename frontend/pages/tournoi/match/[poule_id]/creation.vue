<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";

const route = useRoute()
const poulesStore = usePoulesStore()
const id = Array.isArray(route.params.poule_id) ? route.params.poule_id[0] : route.params.poule_id
const poule_id = parseInt(id, 10)
const poule = poulesStore.getPoule(poule_id)

console.log(poule)

</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <h1 class="text-xl">Création du match pour la poule {{poule?.nom}}</h1>
    </template>
    <template #default>
      {{ poule }}
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>