<script setup lang="ts">
import {useTableauxStore} from "~/store/phases_finales_store";
import DetailTableau from "~/components/app/phases_finales/DetailTableau.vue";

const {$api} = useNuxtApp()
const {tableaux} = useTableauxStore($api)

const items = computed(() => tableaux.value.map((t, index) => ({
  label: t.nom,
  slot: `tableau-${index}`,
  tableau: t
})))

</script>

<template>
  <TournoiGuard>
    <UTabs :items="items" class="w-full">
      <template v-for="item in items" :key="item.slot" #[item.slot]="{ item }">
        <h3 class="text-lg font-bold">
          {{ item.label }}
        </h3>
        <DetailTableau :tableau="item.tableau" />
      </template>
    </UTabs>
  </TournoiGuard>
</template>

