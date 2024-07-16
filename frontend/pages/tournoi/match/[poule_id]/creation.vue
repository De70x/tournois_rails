<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import type {Joueur} from "~/types/Joueur";
import {useStadesStore} from "~/store/stades_store";
import type {FormSubmitEvent} from "#ui/types";
import type {Match} from "~/types/Match";

const route = useRoute()
const poulesStore = usePoulesStore()
const stadesStore = useStadesStore()
const id = Array.isArray(route.params.poule_id) ? route.params.poule_id[0] : route.params.poule_id
const poule_id = parseInt(id, 10)
const poule = poulesStore.getPoule(poule_id)

const triParNombreDeMatchs = (j1: Joueur, j2: Joueur) => {
  return j1.nb_matchs - j2.nb_matchs
}

const state = reactive({
  joueur1_id: '',
  joueur2_id: '',
  stade_id: '',
});

const j1Select = poule?.joueurs
const j2Select = poule?.joueurs

const stades = stadesStore.stades

const handleSubmit = (event: FormSubmitEvent<Match>) => {
  console.log(event.data.joueur1_id)
  console.log(event.data.joueur2_id)
  console.log(event.data.stade_id)
}

</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <h1 class="text-xl">Création du match pour la poule {{ poule?.nom }}</h1>
    </template>
    <template #default>
      <UCard>
        <UForm :state="state" class="space-y-4" @submit="handleSubmit">
          <UFormGroup label="joueur 1" name="j1">
            <USelect v-model="state.joueur1_id" :options="j1Select" option-attribute="nom" value-attribute="id"/>
          </UFormGroup>
          <UFormGroup label="joueur 2" name="j2">
            <USelect v-model="state.joueur2_id" :options="j2Select" option-attribute="nom" value-attribute="id"/>
          </UFormGroup>
          <UFormGroup label="stade" name="stade">
            <USelect v-model="state.stade_id" :options="stades" option-attribute="nom" value-attribute="id"/>
          </UFormGroup>
          <UButton type="submit">
            Créer match
          </UButton>
        </UForm>
      </UCard>
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>