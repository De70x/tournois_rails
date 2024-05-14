<template>
  <FormulaireUtilisateur redirect-url="/connexion" btn-text="Inscription" api-url="/users" fallback-text="Déjà un compte ?">
    <ULink
        to="/connexion"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      Connexion
    </ULink>
  </FormulaireUtilisateur>
</template>


<script setup lang="ts">
</script>
