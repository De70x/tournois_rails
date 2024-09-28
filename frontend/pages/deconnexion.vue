<template/>
<script setup lang="ts">
import {useAuthStore} from "~/store/auth_store";
definePageMeta({
  name: 'Deconnexion'
})
const {$api} = useNuxtApp()
useAuthStore($api).logout()
navigateTo({name: 'Connexion'})
</script>