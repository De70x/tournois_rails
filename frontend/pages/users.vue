<script setup lang="ts">

const {$api} = useNuxtApp()

const users = await $api.get('member-data')

const product = ref({
  name: 'Sample Product',
  description: 'This is a sample product.',
  quantity: 100,
  price: 29.99
});

provide('object', product);

</script>

<template>
  <div>Users</div>
  <div v-for="user in users?.data">
    {{ user }}
  </div>

  <FormWithPermission object-type="product">
    <InputWithPermission propertyName="name" />
    <InputWithPermission propertyName="description" />
    <InputWithPermission propertyName="quantity" />
    <InputWithPermission propertyName="price" />
  </FormWithPermission>

</template>

<style scoped>

</style>