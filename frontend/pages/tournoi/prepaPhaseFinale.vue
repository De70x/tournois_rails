<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import PoulePrepa from "~/components/app/poule/PoulePrepa.vue";

definePageMeta({
  name: 'Prepa_Phase_Finale',
})

const {poules} = usePoulesStore()
</script>

<template>
  <div>
    <h3>Génération tableaux finaux</h3>
    <i>La liste des joueurs cochés iront dans le tableau principal</i>
    <div class="grid grid-cols-3 gap-4 gap-y-14 w-full mt-5">
      <PoulePrepa v-for="poule in poules" :poule="poule"/>
    </div>
    <UButton titre="Générer les tableaux" @click="console.log('Génération tableaux')">Générer</UButton>
  </div>
</template>

<style scoped>

</style>