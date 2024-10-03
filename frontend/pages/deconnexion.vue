<template/>
<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore";
definePageMeta({
  name: 'Deconnexion'
})
const {$api} = useNuxtApp()
useAuthStore($api).logout()
navigateTo({name: 'Connexion'})
</script>