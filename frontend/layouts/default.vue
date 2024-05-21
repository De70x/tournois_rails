<script setup lang="ts">
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center text-center">
    <Navigation/>
    <slot/>
    <UNotifications/>
    <Footer/>
  </div>
</template>

<style scoped>
</style>