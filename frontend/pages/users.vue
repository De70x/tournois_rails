<script setup lang="ts">

const {$api} = useNuxtApp()

const users = await $api.get('member-data')

const product = ref({
  name: 'Sample Product',
  description: 'This is a sample product.',
  quantity: 100,
  price: 29.99,
  dateAdded: Date.now()
});

provide('object', product);

</script>

<template>
  <div>Users</div>
  <div v-for="user in users?.data">
    {{ user }}
  </div>

  <ObjectDetail
      objectType="product"
      :object="product"
  />

</template>

<style scoped>

</style>