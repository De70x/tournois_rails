<script setup lang="ts">
import type {PropType} from "vue";
import type {Joueur} from "~/types/Joueur";
import {useJoueursStore} from "~/stores/useJoueursStore";

const {$api} = useNuxtApp()
const joueursStore = useJoueursStore($api)

defineProps({
  joueurs: {type: Object as PropType<Joueur[]>, required: true},
});

type SortType = {
  column: string;
  direction: 'asc' | 'desc';
}

const sort = ref<SortType>({column: 'points', direction: 'desc'})

const columns = [{
  key: 'nom',
  label: 'Nom',
  sortable: true,
  class: 'w-[200px]'
}, {
  key: 'points',
  label: 'pts',
  sortable: true,
}, {
  key: 'nb_matchs',
  label: 'Nombre matchs',
  sortable: true,
}, {
  key: 'delete'
}]

const desinscrire = (e: any, joueur: Joueur) => {
  e.stopPropagation()
  joueursStore.desinscrireJoueur(joueur)
}

const test = (row: any) => {
  navigateTo({name: 'Detail_Joueur', params: {joueur_id: row.id}})
}


</script>

<template>
  <UTable
      :columns="columns"
      :rows="joueurs"
      :ui="{td:{base: 'text-center'},th:{base: 'text-center'}}"
      :sort="sort"
      sort-asc-icon="i-heroicons-arrow-up-20-solid"
      sort-desc-icon="i-heroicons-arrow-down-20-solid"
      :sort-button="{ icon: 'i-heroicons-arrows-up-down-20-solid', color: 'primary', variant: 'ghost', size: '2xs', square: false }"
      @select="test"
  >
    <template #nom-data="{ row }">
      <div class="truncate w-[200px]" :title="row.nom">
        {{ row.nom }}
      </div>
    </template>

    <template #delete-data="{ row }">
      <UButton color="red" variant="ghost" icon="i-heroicons-user-minus-20-solid" @click="(e) => desinscrire(e, row)"/>
    </template>

  </UTable>
</template>

<style scoped>

</style>