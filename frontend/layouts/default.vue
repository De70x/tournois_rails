<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <header class="">
      <Navigation/>
    </header>

    <main class="container mb-auto text-center mx-auto mt-4">
      <NuxtPage/>
      <ModaleSuppression/>
      <UNotifications />
    </main>

    <footer class="m-4 text-center">
      <p>&copy; Application du tournoi par <i>Antoine Deloffre</i></p>
    </footer>
  </div>
</template>

<style scoped>
</style>