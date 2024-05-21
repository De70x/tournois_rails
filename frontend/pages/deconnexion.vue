<script setup lang="ts">
import {useAuthStore} from "~/store/auth_store";

useAuthStore().logout()
useRouter().push('/connexion')
</script>

<template>

</template>

<style scoped>

</style>