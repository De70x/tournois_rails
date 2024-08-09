<script setup lang="ts">
import type {Poule} from "~/types/Poule";
import type {PropType} from "vue";
import type {FormSubmitEvent} from "#ui/types";
import {usePoulesStore} from "~/store/poules_store";
import ListeJoueursPoule from "~/components/app/poule/ListeJoueursPoule.vue";
import {useModaleStore} from "~/store/modale_store";

const props = defineProps({
  poule: {type: Object as PropType<Poule>, required: true},
});

const poulesStore = usePoulesStore()
const {openModale, configModale} = useModaleStore()

const creationPouleEnCours = ref(false)
const formState = reactive({
  id: -1,
  nom: ""
})

const editerPoule = (poule: Poule) => {
  formState.id = poule.id!
  formState.nom = poule.nom
  creationPouleEnCours.value = true
}

const creationTerminee = async (event: FormSubmitEvent<Partial<Poule>>) => {
  await poulesStore.editPoule({
    id: event.data.id,
    nom: event.data.nom!
  })
  creationPouleEnCours.value = false
}

const supprimerPoule = async (poule: Poule) => {
  configModale({
    id: poule.id!,
    message: `Êtes vous certain de vouloir supprimer la poule : ${poule.nom} ?`
  }, () => poulesStore.deletePoule(poule.id!))
  openModale()
}

const creerMatch = () => {
  navigateTo({name: 'Creation_Match_Poule', params: {poule_id: props.poule.id}})
}

const resteDesMatchs = computed(() => {
  let ilResteDesMatchs = false;
  // il suffit d'un joueur n'ayant pas fait tous ses matchs, dès qu'on en trouve un on retourne vrai
  props.poule.joueurs.forEach((j) => {
    if (j.matchs.length < props.poule.joueurs.length - 1) {
      ilResteDesMatchs = true;
    }
  });
  return ilResteDesMatchs;
})

</script>

<template>
  <div>
    <UCard :key="poule.id" class="w-full h-full">
      <template #header>
        <UForm v-if="creationPouleEnCours" :state="formState" @submit="creationTerminee"
               class="flex gap-2 justify-center">
          <UInput v-model="formState.nom"></UInput>
          <UButton type="submit">Valider</UButton>
        </UForm>
        <div v-else @dblclick="editerPoule(poule)" class="flex items-center relative">
          <span class="flex-grow text-center">{{ poule.nom }}</span>
          <UButton v-if="poule.joueurs.length === 0" color="red" variant="ghost" icon="i-heroicons-trash-20-solid"
                   @click="supprimerPoule(poule)"
                   class="absolute right-0"/>
        </div>

      </template>
      <ListeJoueursPoule :joueurs="poule.joueurs"/>
    </UCard>
    <UButton v-if="resteDesMatchs" class="m-2" @click="creerMatch">Lancer un match</UButton>
  </div>
</template>

<style scoped>

</style>