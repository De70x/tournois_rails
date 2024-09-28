<script setup lang="ts">
import {useTableauxStore} from "~/store/phases_finales_store";
import type {Tableau} from "~/types/Tableau";

const {$api} = useNuxtApp()
const tableauxStore = useTableauxStore($api);

const fields = [
  {key: 'id', label: 'ID', type: 'number'},
  {key: 'nom', label: 'Nom', type: 'text'},
];

const createTableau = async (tableau: Partial<Tableau>) => {
  await tableauxStore.createTableau(tableau as Tableau);
};

const editTableau = async (stade: Tableau) => {
  await tableauxStore.editTableau(stade);
};

const deleteTableau = async (id: number) => {
  await tableauxStore.deleteTableau(id);
};
</script>

<template>
  <GenericCRUD
      :items="tableauxStore.tableaux.value"
      store-name="tableaux"
      item-name="tableau"
      :fields="fields"
      :create-item="createTableau"
      :edit-item="editTableau"
      :delete-item="deleteTableau"
  />
</template>