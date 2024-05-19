<script setup lang="ts">
const {$api} = useNuxtApp()
const router = useRouter();
await $api.delete('/users/sign_out')
await router.push('/');
</script>

<template>

</template>

<style scoped>

</style>