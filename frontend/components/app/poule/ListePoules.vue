<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import type {FormSubmitEvent} from "#ui/types";
import type {Joueur} from "~/types/Joueur";
import {useTournoisStore} from "~/store/tournois_store";
import DetailPoule from "~/components/app/poule/DetailPoule.vue";

const poulesStore = usePoulesStore()
const tournoisStore = useTournoisStore()
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
    tournoi_id: tournoisStore.tournoiActif.id!,
    joueurs: []
  })
  creationPouleEnCours.value = false
}

</script>

<template>
  <div>
    <UButton @click="creationPoule" variant="outline" class="m-5">Créer une poule</UButton>
    <UForm v-if="creationPouleEnCours" :state="formState" @submit="creationTerminee">
      <UInput v-model="formState.nom"></UInput>
      <UButton type="submit">Valider</UButton>
    </UForm>
    <div class="grid grid-cols-2 gap-4 w-full">
      <DetailPoule v-for="poule in poules" :poule="poule"/>
    </div>
  </div>
</template>

<style scoped>

</style>