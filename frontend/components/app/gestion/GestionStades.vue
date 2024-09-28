<script setup lang="ts">
import {useStadesStore} from "~/store/stades_store";
import type {Stade} from "~/types/Stade";

const {$api} = useNuxtApp()
const stadesStore = useStadesStore($api);

const fields = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'nom', label: 'Nom', type: 'text' },
  { key: 'disponible', label: 'Disponible', type: 'boolean' }
];

const createStade = async (stade: Partial<Stade>) => {
  await stadesStore.createStade({
    ...stade,
    disponible: true
  } as Stade);
};

const editStade = async (stade: Stade) => {
  await stadesStore.editStade(stade);
};

const deleteStade = async (id: number) => {
  await stadesStore.deleteStade(id);
};
</script>

<template>
  <GenericCRUD
      :items="stadesStore.stades.value"
      store-name="stades"
      item-name="stade"
      :fields="fields"
      :create-item="createStade"
      :edit-item="editStade"
      :delete-item="deleteStade"
  />
</template>