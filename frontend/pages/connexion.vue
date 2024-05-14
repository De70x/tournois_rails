<template>
  <FormulaireUtilisateur redirect-url="/connexion" btn-text="Connexion" api-url="/users/sign_in" fallback-link="/inscription" fallback-text="Pas encore de compte ?">
    <ULink
        to="/inscription"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      Inscription
    </ULink>
  </FormulaireUtilisateur>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>