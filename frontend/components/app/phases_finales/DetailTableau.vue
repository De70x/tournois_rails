<script setup lang="ts">
import type {Tableau} from "~/types/Tableau";

interface IProps {
  tableau: Tableau
}
defineProps<IProps>()

console.log('coucou')
</script>

<template>
<div>{{tableau.nom}}</div>
</template>

<style scoped>

</style>