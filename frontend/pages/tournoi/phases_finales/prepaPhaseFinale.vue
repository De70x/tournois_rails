<script setup lang="ts">
import {usePoulesStore} from "~/stores/usePoulesStore";
import PoulePrepa from "~/components/app/poule/PoulePrepa.vue";
import {useTableauxStore} from "~/stores/useTableauxStore";
import {useJoueursStore} from "~/stores/useJoueursStore";
import {useTagsStore} from "~/stores/useTagsStore";
import {generateBracket} from "~/utils/phasesFinales";

definePageMeta({
  name: 'Prepa_Phase_Finale',
})

const {$api} = useNuxtApp()
const {poules} = usePoulesStore($api)
const {tableaux, joueursSelectionnes} = useTableauxStore($api)
const {inscrirePhaseFinale, joueurs} = useJoueursStore($api)
const {tags} = useTagsStore($api)
const idPrincipale = tableaux.value.find(t => t.nom === 'Principale')!.id
const idTableauSelectionne = ref(idPrincipale)


const selectionTableau = (idSelectionne: number) => {
  idTableauSelectionne.value = idSelectionne
}

const genererTableau = async () => {
  for (const j of joueursSelectionnes.value) {
    await inscrirePhaseFinale(j, idTableauSelectionne.value!)
  }
  generateBracket(joueursSelectionnes.value, idTableauSelectionne.value!);
  joueursSelectionnes.value = []
  await navigateTo({name: 'Detail_Tournoi'})
}

const selectByTag = (id: number) => {
  joueursSelectionnes.value = joueurs.value.filter(j => j.tag_id === id)
}
</script>

<template>
  <TournoiGuard>
    <div>
      <h3>Génération tableaux finaux</h3>
      <USelect v-model="idTableauSelectionne" :options="tableaux" option-attribute="nom" value-attribute="id"
               @change="selectionTableau"/>
      <i>Les joueurs cochés iront dans le tableau sélectionné</i>

      <div class="flex justify-evenly mt-2">
        <UButton v-for="tag in tags" :title="`sélectionner tous les joueurs portant le tag ${tag.nom}`"
                 variant="outline" :icon="tag.icon" @click="() => selectByTag(tag.id)" :id="tag.id">
          {{ tag.nom }}
        </UButton>
      </div>

      <div class="grid grid-cols-3 gap-4 gap-y-14 w-full mt-5">
        <PoulePrepa v-for="poule in poules" :poule="poule"/>
      </div>
      <UButton :disabled="idTableauSelectionne === -1" @click="genererTableau">
        Envoyer dans le tableau sélectionné
      </UButton>
    </div>
  </TournoiGuard>
</template>

<style scoped>

</style>