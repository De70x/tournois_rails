<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";

const tournoiStore = useTournoisStore()
tournoiStore.fetchTournois()
const router = useRouter()
const creationTournoi = () => {
  router.push("/tournoi/creation")
}
const supprimerTournoi = (id) => {
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

</script>

<template>
  <p>Liste des tournois</p>
  <UTable :rows="tournoiStore.tournois" :columns="columns">
    <template #actions-data="{ row }">
        <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="supprimerTournoi(row.id)"/>
    </template>
  </UTable>
  <UButton @click="creationTournoi()">Créer un tournoi</UButton>
</template>