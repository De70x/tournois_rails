<script setup lang="ts">

const {$api} = useNuxtApp()

const users = await $api.get('member-data')

</script>

<template>
  <div>Users</div>
  <div v-for="user in users?.data">
    {{ user }}
  </div>
</template>

<style scoped>

</style>