<script setup lang="ts">
import {usePoulesStore} from "~/stores/usePoulesStore";
import type {FormSubmitEvent} from "#ui/types";
import type {Joueur} from "~/types/Joueur";
import {useTournoisStore} from "~/stores/useTournoisStore";
import DetailPoule from "~/components/app/poule/DetailPoule.vue";

const {$api} = useNuxtApp()
const poulesStore = usePoulesStore($api)
const tournoisStore = useTournoisStore($api)
const poules = computed(() => poulesStore.poules)

const creationPouleEnCours = ref(false)

const formState = reactive({
  id: -1,
  nom: ""
})

const creationPoule = () => {
  formState.id = -1
  formState.nom = ''
  creationPouleEnCours.value = true
}

const creationTerminee = async (event: FormSubmitEvent<Partial<Joueur>>) => {
  await poulesStore.createPoule({
    nom: event.data.nom!,
    tournoi_id: tournoisStore.tournoiActif.value?.id!,
    joueurs: []
  })
  creationPouleEnCours.value = false
}

</script>

<template>
  <div>
    <UButton @click="creationPoule" variant="outline" class="m-5">Créer une poule</UButton>
    <UButton @click="navigateTo({name: 'Prepa_Phase_Finale'})">Générer les tableaux finaux</UButton>
    <UForm v-if="creationPouleEnCours" :state="formState" @submit="creationTerminee">
      <UInput v-model="formState.nom"></UInput>
      <UButton type="submit">Valider</UButton>
    </UForm>
    <div class="grid grid-cols-2 gap-4 gap-y-14 w-full">
      <DetailPoule v-for="poule in poules.value" :poule="poule"/>
    </div>
  </div>
</template>

<style scoped>

</style>