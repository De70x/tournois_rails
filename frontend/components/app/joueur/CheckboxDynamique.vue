<script setup lang="ts">
import type {Joueur} from "~/types/Joueur";
import {usePoulesStore} from "~/stores/usePoulesStore";
import {useTableauxStore} from "~/stores/useTableauxStore";

interface Props {
  joueur: Joueur
}

const props = defineProps<Props>()
const {$api} = useNuxtApp()
const {getQualifiesPoule} = usePoule()
const {getPoule} = usePoulesStore($api)
const poule = getPoule(props.joueur.poule_id!)
const {ajouterJoueur, retirerJoueur, joueursSelectionnes} = useTableauxStore($api)

const isChecked = computed(() => joueursSelectionnes.value.includes(props.joueur))

const changementCheckbox = (value: boolean) => {
  if (value) {
    ajouterJoueur(props.joueur)
  } else {
    retirerJoueur(props.joueur)
  }
}

onMounted(() => {
  const estQualifie = getQualifiesPoule(poule!).includes(props.joueur.id!)
  if (estQualifie) {
    ajouterJoueur(props.joueur)
  }
  else{
    retirerJoueur(props.joueur)
  }
})

</script>

<template>
  <UCheckbox v-model="isChecked" @change="changementCheckbox"/>
</template>

<style scoped>

</style>