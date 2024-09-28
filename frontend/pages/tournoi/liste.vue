<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
import {useModaleStore} from "~/store/modale_store";
import type {Tournoi} from "~/types/Tournoi";
import {usePermissions} from "~/composables/usePermissions";
import {computedAsync} from "@vueuse/core";

definePageMeta({
  name: 'Liste_Tournois'
})

const {$api} = useNuxtApp()
const {fetchTournois, deleteTournoi, setActif, tournois} = useTournoisStore($api)
const {openModale, configModale} = useModaleStore()
const {hasPermission} = usePermissions()

fetchTournois()

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

const creationTournoi = () => {
  navigateTo({name: 'Creation_Tournoi'})
}
const supprimerTournoi = (tournoi: Tournoi, e: any) => {
  e.stopPropagation()
  configModale({
    id: tournoi.id!,
    message: `Êtes vous certain de vouloir supprimer le tournoi ${tournoi.nom} de ${tournoi.annee} ?`
  }, () => deleteTournoi(tournoi.id!))
  openModale()
}

const select = async (row: any) => {
  await setActif(row.id)
  await navigateTo({name: 'Detail_Tournoi'})
}

const hasPerm = computedAsync(async () => await hasPermission('edit_tournoi'), false)

</script>

<template>
  <TournoiGuard>
    <h1 class="text-xl">Liste des tournois</h1>
    <UTable
        :rows="tournois"
        :columns="columns"
        @select="select"
        class="w-full"
        :ui="{td:{base: 'text-center'},th:{base: 'text-center'}}"
    >

      <template #actions-data="{ row }" v-if="hasPerm">
        <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid"
                 @click="(e) => supprimerTournoi(row, e)"/>
      </template>
    </UTable>
    <UButton @click="creationTournoi()">Créer un tournoi</UButton>
  </TournoiGuard>
</template>