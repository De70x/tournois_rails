<script setup>
import { useTournoisStore } from '~/store/tournois_store'

const tournoiStore = useTournoisStore()

const { data: tournoiChecked } = await useAsyncData('tournoiCheck', async () => {
  if (!tournoiStore.tournoiActif) {
    await navigateTo({name: 'Liste_Tournois'})
    return false
  }
  return true
})
</script>

<template>
  <div v-if="tournoiChecked">
    <slot></slot>
  </div>
</template>