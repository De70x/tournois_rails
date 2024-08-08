<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";

definePageMeta({
  name: 'Liste_Tournois'
})

const tournoiStore = useTournoisStore()
tournoiStore.fetchTournois()
const creationTournoi = () => {
  navigateTo({name: 'Creation_Tournoi'})
}
const supprimerTournoi = (id: number, e: any) => {
  e.stopPropagation()
  tournoiStore.deleteTournoi(id)
}

const columns = [{
  key: 'nom',
  label: 'Nom'
}, {
  key: 'annee',
  label: 'Année',
  sortable: true
}, {
  key: 'actions'
}]

const select = async (row: any) => {
  await tournoiStore.setActif(row.id)
  await navigateTo({name: 'Detail_Tournoi'})
}

const hasPerm = await hasPermission('edit_tournoi')

</script>

<template>
  <h1 class="text-xl">Liste des tournois</h1>
  <UTable
      :rows="tournoiStore.tournois"
      :columns="columns"
      @select="select"
      class="w-full"
      :ui="{td:{base: 'text-center'},th:{base: 'text-center'}}"
  >
    <template #actions-data="{ row }" v-if="hasPerm">
      <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid"
               @click="(e) => supprimerTournoi(row.id, e)"/>
    </template>
  </UTable>
  <UButton @click="creationTournoi()">Créer un tournoi</UButton>
</template>