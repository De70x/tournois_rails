<script setup lang="ts">
import {usePoulesStore} from "~/store/poules_store";
import PoulePrepa from "~/components/app/poule/PoulePrepa.vue";
import {useTableauxStore} from "~/store/phases_finales_store";
import {useJoueursStore} from "~/store/joueurs_store";

definePageMeta({
  name: 'Prepa_Phase_Finale',
})

const {poules} = usePoulesStore()
const {tableaux, joueursSelectionnes} = useTableauxStore()
const {inscrirePhaseFinale} = useJoueursStore()
const idPrincipale = tableaux.find(t => t.nom === 'Principale')!.id
const tableauSelectionne = ref(idPrincipale)


const selectionTableau = (idSelectionne: number) => {
  tableauSelectionne.value = idSelectionne
}

const genererTableau = async () => {
  for (const j of joueursSelectionnes) {
    await inscrirePhaseFinale(j, tableauSelectionne.value!)
  }
}
</script>

<template>
  <div>
    <h3>Génération tableaux finaux</h3>
    <USelect v-model="tableauSelectionne" :options="tableaux" option-attribute="nom" value-attribute="id"
             @change="selectionTableau"/>
    <i>Les joueurs cochés iront dans le tableau sélectionné</i>
    <div class="grid grid-cols-3 gap-4 gap-y-14 w-full mt-5">
      <PoulePrepa v-for="poule in poules" :poule="poule"/>
    </div>
    <UButton :disabled="tableauSelectionne === -1" v-model="tableauSelectionne"
             @click="genererTableau">
      Envoyer dans le tableau sélectionné
    </UButton>
  </div>
</template>

<style scoped>

</style>