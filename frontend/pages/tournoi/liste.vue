<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";

const tournoiStore = useTournoisStore()
tournoiStore.fetchTournois()
const router = useRouter()
const creationTournoi = () => {
  router.push("/tournoi/creation")
}
const supprimerTournoi = (id: number) => {
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

const select = (row: any) => {
  tournoiStore.setActif(row.id)
  useRouter().push('/tournoi/detail')
}

</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <h1 class="text-xl">Liste des tournois</h1>
    </template>
    <template #default>
      <UTable :rows="tournoiStore.tournois" :columns="columns" @select="select" class="w-full">
        <template #actions-data="{ row }">
          <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="supprimerTournoi(row.id)"/>
        </template>
      </UTable>
      <UButton @click="creationTournoi()">Créer un tournoi</UButton>
    </template>
  </NuxtLayout>
</template>