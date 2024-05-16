<script setup lang="ts">
import {computedAsync} from "@vueuse/core";

const {$api} = useNuxtApp()

const users = computedAsync(async () => {
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