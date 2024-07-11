<script setup lang="ts">
import type {Poule} from "~/types/Poule";
import type {PropType} from "vue";
import type {FormSubmitEvent} from "#ui/types";
import {usePoulesStore} from "~/store/poules_store";

defineProps({
  poule: {type: Object as PropType<Poule>, required: true},
});

const poulesStore = usePoulesStore()

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

const supprimerPoule = async (pouleId: number) => {
  await poulesStore.deletePoule(pouleId)
}

</script>

<template>
  <UCard :key="poule.id" class="w-full h-full">
    <template #header>
      <UForm v-if="creationPouleEnCours" :state="formState" @submit="creationTerminee"
             class="flex gap-2 justify-center">
        <UInput v-model="formState.nom"></UInput>
        <UButton type="submit">Valider</UButton>
      </UForm>
      <div v-else @dblclick="editerPoule(poule)" class="flex items-center relative">
        <span class="flex-grow text-center">{{ poule.nom }}</span>
        <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="supprimerPoule(poule.id!)"
                 class="absolute right-0"/>
      </div>

    </template>
    <UTable :rows="poule.joueurs" :ui="{td:{base: 'text-center'},th:{base: 'text-center'}}"/>
  </UCard>
</template>

<style scoped>

</style>