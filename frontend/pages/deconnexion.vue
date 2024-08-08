<template/>
<script setup lang="ts">
import {useAuthStore} from "~/store/auth_store";
definePageMeta({
  name: 'Deconnexion'
})

useAuthStore().logout()
navigateTo({name: 'Connexion'})
</script>