<script setup>

const {$api} = useNuxtApp
const tournoiStore = useTournoisStore($api)

const {data: tournoiChecked} = await useAsyncData('tournoiCheck', async () => {
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