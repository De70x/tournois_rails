<script setup lang="ts">
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center text-center">
    <Navigation/>
    <header class="absolute inset-x-0 top-20">
      <slot name="header"/>
    </header>
    <slot class="mt-20"/>
    <footer class="absolute inset-x-0 bottom-20">
      <slot name="footer"/>
    </footer>
    <UNotifications/>
    <Footer/>
  </div>
</template>

<style scoped>
</style>