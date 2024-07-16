<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import type {Joueur} from "~/types/Joueur";
import {useStadesStore} from "~/store/stades_store";

const route = useRoute()
const poulesStore = usePoulesStore()
const stadesStore = useStadesStore()
const id = Array.isArray(route.params.poule_id) ? route.params.poule_id[0] : route.params.poule_id
const poule_id = parseInt(id, 10)
const poule = poulesStore.getPoule(poule_id)

const triParNombreDeMatchs = (j1: Joueur, j2: Joueur) => {
  return j1.nb_matchs - j2.nb_matchs
}

const j1 = ref(poule?.joueurs[0])
const j2 = ref(undefined)
const j1Select = poule?.joueurs
const j2Select = poule?.joueurs

const stades = stadesStore.stades
const stade = ref(stades[0])

</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <h1 class="text-xl">Création du match pour la poule {{poule?.nom}}</h1>
    </template>
    <template #default>
      <USelect v-model="j1" :options="j1Select" option-attribute="nom"/>
      <USelect v-model="j2" :options="j2Select" option-attribute="nom"/>
      <USelect v-model="stade" :options="stades" option-attribute="nom"/>
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>