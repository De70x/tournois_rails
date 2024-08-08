<template/>
<script setup lang="ts">
const authCookie = useCookie('auth-token')

definePageMeta({
  name: 'Home'
})

if (authCookie.value) {
  navigateTo({name: 'Liste_Tournois'})
} else {
  navigateTo({name: 'Connexion'})
}
</script>