<script setup lang="ts">

import {computedAsync} from "@vueuse/core";

const {$api} = useNuxtApp()

const {data:users} = await $api.get('member-data')

</script>

<template>
  <div>Users</div>
  <div v-for="user in users">
    {{ user }}
  </div>
</template>

<style scoped>

</style>