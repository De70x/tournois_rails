<script setup lang="ts">
import type {PropType} from "vue";
import type {Joueur} from "~/types/Joueur";
import CheckboxDynamique from "~/components/app/joueur/CheckboxDynamique.vue";

defineProps({
  joueurs: {type: Object as PropType<Joueur[]>, required: true},
});

type SortType = {
  column: string;
  direction: 'asc' | 'desc';
}

const sort = ref<SortType>({column: 'points', direction: 'desc'})

const columns = [
  {
    key: 'selection'
  }, {
    key: 'nom',
    label: 'Nom',
    class: 'w-[200px]'
  }, {
    key: 'points',
    label: 'pts',
  }, {
    key: 'nb_matchs',
    label: 'Nombre matchs',
  }]

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
  >
    <template #nom-data="{ row }">
      <div class="truncate w-[200px]" :title="row.nom">
        {{ row.nom }}
      </div>
    </template>

    <template #selection-data="{ row }">
      <CheckboxDynamique :joueur="row"/>
    </template>

  </UTable>
</template>

<style scoped>

</style>