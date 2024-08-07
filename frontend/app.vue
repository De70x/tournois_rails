<script setup lang="ts">
</script>

<template>
  <div>
    <!-- silly trick to have the gif loaded as soon as we need it -->
    <NuxtImg src="/tirage.gif" width="500px" hidden="hidden"/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>