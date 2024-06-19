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
  <ObjectDetail
      objectType="user"
      :object="users?.data.user"
  />
</template>

<style scoped>

</style>