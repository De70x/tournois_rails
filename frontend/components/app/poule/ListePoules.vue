<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";

const poulesStore = usePoulesStore()
const poules = computed(() => poulesStore.poules)
console.log(poules)
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <UCard v-for="poule in poules" :key="poule.id" class="w-96">
      <h3>{{ poule.nom }}</h3>
    </UCard>
  </div>
</template>

<style scoped>

</style>