<script setup lang="ts">
import type {Poule} from "~/types/Poule";
import type {PropType} from "vue";
import PrepaListeJoueursPoule from "~/components/app/poule/PrepaListeJoueursPoule.vue";

defineProps({
  poule: {type: Object as PropType<Poule>, required: true},
})

</script>

<template>
  <UCard :key="poule.id" class="w-full h-full">
    <template #header>
      <div class="flex items-center relative">
        <span class="flex-grow text-center">{{ poule.nom }}</span>
      </div>
    </template>
    <PrepaListeJoueursPoule :joueurs="poule.joueurs"/>
  </UCard>
</template>

<style scoped>

</style>