<script setup lang="ts">
import type {Joueur} from "~/types/Joueur";
import {usePoulesStore} from "~/store/poules_store";
import {useTableauxStore} from "~/store/phases_finales_store";

interface Props {
  joueur: Joueur
}

const props = defineProps<Props>()

const {getQualifiesPoule} = usePoule()
const {getPoule} = usePoulesStore()
const poule = getPoule(props.joueur.poule_id!)
const {ajouterJoueur, retirerJoueur} = useTableauxStore()

const isChecked = () => {
  const estQualifie = getQualifiesPoule(poule!).includes(props.joueur.id!)
  if (estQualifie) {
    ajouterJoueur(props.joueur)
  }
  else{
    retirerJoueur(props.joueur)
  }
  return estQualifie
}

const selected = ref(isChecked())

const changementCheckbox = (value: boolean) => {
  if (value) {
    ajouterJoueur(props.joueur)
  } else {
    retirerJoueur(props.joueur)
  }
}

</script>

<template>
  <UCheckbox v-model="selected" @change="changementCheckbox"/>
</template>

<style scoped>

</style>