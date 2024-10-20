<script setup lang="ts">
import {useTableauxStore} from "~/stores/useTableauxStore";
import DetailTableau from "~/components/app/phases_finales/DetailTableau.vue";
import type {TabItem} from "#ui/types/tabs";
import {useTournoisStore} from "~/stores/useTournoisStore";

const {$api} = useNuxtApp()
const {tableaux} = useTableauxStore($api)
const {initTournoiActif} = useTournoisStore($api)

const items : ComputedRef<TabItem[]> = computed(() => tableaux.value.map((t, index) => ({
  label: t.nom,
  slot: `tableau-${index}`,
  tableau: t
})))

</script>

<template>
  <TournoiGuard>
    <UTabs :items="items" class="w-full" @click="initTournoiActif">
      <template v-for="itemi in items" :key="itemi.slot" #[itemi.slot]="{ item }">
        <h3 class="text-lg font-bold">
          {{ itemi.label }}
        </h3>
        <DetailTableau :tableau="itemi.tableau" />
      </template>
    </UTabs>
  </TournoiGuard>
</template>

