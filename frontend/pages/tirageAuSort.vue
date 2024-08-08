<script setup lang="ts">
definePageMeta({
  name: 'Tirage_Au_Sort'
})

setTimeout(() => {
  navigateTo({name: 'Detail_Tournoi'})
}, 5000)
</script>

<template>
  <NuxtImg src="/tirage.gif" width="500px"/>
</template>

<style scoped>

</style>