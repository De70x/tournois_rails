<script setup lang="ts">
import type {Poule} from "~/types/Poule";
import type {PropType} from "vue";
import PrepaListeJoueursPoule from "~/components/app/poule/PrepaListeJoueursPoule.vue";
import {useJoueursStore} from "~/store/joueurs_store";

const props = defineProps({
  poule: {type: Object as PropType<Poule>, required: true},
})

const {joueurs} = useJoueursStore()

const joueursSansTableau = joueurs.filter(j => j.poule_id === props.poule.id && j.tableau_final_id === null)

</script>

<template>
  <UCard :key="poule.id" class="w-full h-full">
    <template #header>
      <div class="flex items-center relative">
        <span class="flex-grow text-center">{{ poule.nom }}</span>
      </div>
    </template>
    <PrepaListeJoueursPoule :joueurs="joueursSansTableau"/>
  </UCard>
</template>

<style scoped>

</style>