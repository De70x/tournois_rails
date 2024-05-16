<template>
</template>
<script setup lang="ts">
import {useAuthStore} from "~/store/auth_store";

const auth = useAuthStore()

if(auth.authToken) {
  useRouter().push('/users')
}
else{
  useRouter().push('/connexion')
}

</script>