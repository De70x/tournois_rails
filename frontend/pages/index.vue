<template>
</template>
<script setup lang="ts">
import {useAuthStore} from "~/store/auth_store";

const authStore = useAuthStore()

if(authStore.authToken) {
  useRouter().push('/users')
}
else{
  useRouter().push('/connexion')
}

</script>