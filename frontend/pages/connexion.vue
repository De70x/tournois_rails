<template>
  <FormulaireUtilisateur type-formulaire="connexion"/>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["user"],
  name: "Connexion",
})
</script>