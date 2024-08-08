<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import type {Joueur} from "~/types/Joueur";
import {useStadesStore} from "~/store/stades_store";
import type {FormSubmitEvent} from "#ui/types";
import type {Match} from "~/types/Match";
import {useJoueursStore} from "~/store/joueurs_store";
import {useMatchsStore} from "~/store/matchs_store";

const route = useRoute()
const poulesStore = usePoulesStore()
const stadesStore = useStadesStore()
const joueursStore = useJoueursStore()
const matchsStore = useMatchsStore()
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

const stades = stadesStore.getStadesDisponibles

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

const handleSubmit = async (event: FormSubmitEvent<Match>) => {
  await matchsStore.createMatch({
    joueur1_id: event.data.joueur1_id,
    joueur2_id: event.data.joueur2_id,
    stade_id: event.data.stade_id
  })
  useRouter().push('/tournoi/detail')
}

</script>

<template>
  <h1 class="text-xl">Création du match pour la poule {{ poule?.nom }}</h1>
  <UCard>
    <UForm :state="formState" class="space-y-4" @submit="handleSubmit">
      <div class="flex gap-10">
        <UFormGroup label="joueur 1" name="j1">
          <USelect v-if="j1Select.length > 0" v-model="formState.joueur1_id" :options="j1Select" option-attribute="nom" value-attribute="id"
                   @change="editListe1"/>
          <div v-else>Pas de joueur disponible</div>
        </UFormGroup>
        <UFormGroup label="joueur 2" name="j2">
          <USelect v-if="j2Select.length > 0" v-model="formState.joueur2_id" :options="j2Select" option-attribute="nom" value-attribute="id"
                   @change="editListe2"/>
          <div v-else>Pas de joueur disponible</div>
        </UFormGroup>
      </div>
      <UFormGroup label="stade" name="stade">
        <USelect v-if="stades.length > 0" v-model="formState.stade_id" :options="stades" option-attribute="nom" value-attribute="id"/>
        <div v-else>Pas de stades disponibles</div>
      </UFormGroup>
      <UButton type="submit">
        Créer match
      </UButton>
    </UForm>
  </UCard>
</template>

<style scoped>

</style>