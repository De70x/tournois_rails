<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import PoulePrepa from "~/components/app/poule/PoulePrepa.vue";
import {useTableauxStore} from "~/store/phases_finales_store";
import {useJoueursStore} from "~/store/joueurs_store";
import {useTagsStore} from "~/store/tags_store";

definePageMeta({
  name: 'Prepa_Phase_Finale',
})

const {poules} = usePoulesStore()
const {tableaux, joueursSelectionnes} = useTableauxStore()
const {inscrirePhaseFinale} = useJoueursStore()
const {tags} = useTagsStore()
const idPrincipale = tableaux.value.find(t => t.nom === 'Principale')!.id
const idTableauSelectionne = ref(idPrincipale)

const listeJoueursSelectionnes = computed(() => joueursSelectionnes)


const selectionTableau = (idSelectionne: number) => {
  idTableauSelectionne.value = idSelectionne
}

const genererTableau = async () => {
  for (const j of listeJoueursSelectionnes.value.value) {
    await inscrirePhaseFinale(j, idTableauSelectionne.value!)
  }
  await navigateTo({name: 'Detail_Tournoi'})
}
</script>

<template>
  <div>
    <h3>Génération tableaux finaux</h3>
    <USelect v-model="idTableauSelectionne" :options="tableaux" option-attribute="nom" value-attribute="id"
             @change="selectionTableau"/>
    <i>Les joueurs cochés iront dans le tableau sélectionné</i>

    <div class="flex justify-evenly">
      <UButton v-for="tag in tags" :title="`sélectionner tous les joueurs portant le tag ${tag.nom}`" variant="outline" :icon="tag.icon">
        {{tag.nom}}
      </UButton>
    </div>

    <div class="grid grid-cols-3 gap-4 gap-y-14 w-full mt-5">
      <PoulePrepa v-for="poule in poules" :poule="poule"/>
    </div>
    <UButton :disabled="idTableauSelectionne === -1" @click="genererTableau">
      Envoyer dans le tableau sélectionné
    </UButton>
  </div>
</template>

<style scoped>

</style>