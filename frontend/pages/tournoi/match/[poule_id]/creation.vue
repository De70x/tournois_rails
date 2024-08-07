<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import type {Joueur} from "~/types/Joueur";
import {useStadesStore} from "~/store/stades_store";
import type {FormSubmitEvent} from "#ui/types";
import type {Match} from "~/types/Match";
import {useJoueursStore} from "~/store/joueurs_store";

const route = useRoute()
const poulesStore = usePoulesStore()
const stadesStore = useStadesStore()
const joueursStore = useJoueursStore()
const id = Array.isArray(route.params.poule_id) ? route.params.poule_id[0] : route.params.poule_id
const poule_id = parseInt(id, 10)
const poule = poulesStore.getPoule(poule_id)

const formState = reactive({
  joueur1_id: '',
  joueur2_id: '',
  stade_id: '',
});

const j1Select = ref(joueursStore.getJoueursDisponiblesDansPoule(poule_id))
const j2Select = ref(joueursStore.getJoueursDisponiblesDansPoule(poule_id))

const stades = stadesStore.stades

const editListe1 = (event: string) => {
  j2Select.value = getListeFiltree(parseInt(event))
}

const editListe2 = (event: string) => {
  j1Select.value = getListeFiltree(parseInt(event))
}

const getListeFiltree = (idSelectionne: number) => {
  let nouvelleListe = joueursStore.getAdversairesValides(idSelectionne, poule_id)
  nouvelleListe = nouvelleListe.filter(j => j.id !== idSelectionne)
  return nouvelleListe
}

const triParNombreDeMatchs = (j1: Joueur, j2: Joueur) => {
  return j1.nb_matchs - j2.nb_matchs
}

const handleSubmit = (event: FormSubmitEvent<Match>) => {
  console.log(event.data.joueur1_id)
  console.log(event.data.joueur2_id)
  console.log(event.data.stade_id)
}

</script>

<template>
  <h1 class="text-xl">Création du match pour la poule {{ poule?.nom }}</h1>
  <UCard>
    <UForm :state="formState" class="space-y-4" @submit="handleSubmit">
      <div class="flex gap-10">
        <UFormGroup label="joueur 1" name="j1">
          <USelect v-model="formState.joueur1_id" :options="j1Select" option-attribute="nom" value-attribute="id"
                   @change="editListe1"/>
        </UFormGroup>
        <UFormGroup label="joueur 2" name="j2">
          <USelect v-model="formState.joueur2_id" :options="j2Select" option-attribute="nom" value-attribute="id"
                   @change="editListe2"/>
        </UFormGroup>
      </div>
      <UFormGroup label="stade" name="stade">
        <USelect v-model="formState.stade_id" :options="stades" option-attribute="nom" value-attribute="id"/>
      </UFormGroup>
      <UButton type="submit">
        Créer match
      </UButton>
    </UForm>
  </UCard>
</template>

<style scoped>

</style>