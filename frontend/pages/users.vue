<script setup lang="ts">

const {$api} = useNuxtApp()

const {data: users} = await $api.get('member-data')

</script>

<template>
  <div>Users</div>
  <div v-for="user in users">
    {{ user }}
  </div>
</template>

<style scoped>

</style>