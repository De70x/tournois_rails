<template>
</template>
<script setup lang="ts">

const authCookie = useCookie('auth-token')

if(authCookie.value) {
  useRouter().push('/users')
}
else{
  useRouter().push('/connexion')
}

</script>