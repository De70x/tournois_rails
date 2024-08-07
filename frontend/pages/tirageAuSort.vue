<script setup lang="ts">
const router = useRouter()
setTimeout(() => {
  router.push('/tournoi/detail')
}, 5000)
</script>

<template>
  <NuxtImg src="/tirage.gif" width="500px"/>
</template>

<style scoped>

</style>