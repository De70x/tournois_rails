<script setup lang="ts">
import {computedAsync} from "@vueuse/core";

const {$api} = useNuxtApp()

const users = computedAsync(async () => {

  // TODO https://sdrmike.medium.com/rails-7-api-only-app-with-devise-and-jwt-for-authentication-1397211fb97c
  const test = await $api.get('/member-data')
  console.log(test)
  return test
})

</script>

<template>
  <div>Users</div>
  <div v-for="user in users">
    {{ user }}
  </div>
</template>

<style scoped>

</style>