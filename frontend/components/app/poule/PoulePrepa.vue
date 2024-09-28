<script setup lang="ts">
import type {Poule} from "~/types/Poule";
import type {PropType} from "vue";
import PrepaListeJoueursPoule from "~/components/app/poule/PrepaListeJoueursPoule.vue";
import {useJoueursStore} from "~/store/joueurs_store";

const props = defineProps({
  poule: {type: Object as PropType<Poule>, required: true},
})
const {$api} = useNuxtApp()
const {getJoueursSansTableau} = useJoueursStore($api)

const listeJoueursSansTableau = getJoueursSansTableau(props.poule.id!)

</script>

<template>
  <UCard :key="poule.id" class="w-full h-full">
    <template #header>
      <div class="flex items-center relative">
        <span class="flex-grow text-center">{{ poule.nom }}</span>
      </div>
    </template>
    <PrepaListeJoueursPoule :joueurs="listeJoueursSansTableau"/>
  </UCard>
</template>

<style scoped>

</style>