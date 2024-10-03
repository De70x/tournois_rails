<script setup lang="ts">

import {useModaleStore} from "~/stores/useModaleStore";

const {closeModale, isOpen, objetASupprimer, fonctionDeSuppression} = useModaleStore()

</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6">Confirmation de Suppression</h3>
      </template>
      <p>{{ objetASupprimer.message }}</p>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <UButton color="gray" label="Annuler" @click="closeModale"/>
          <UButton color="red" label="Supprimer" @click="() => {
            fonctionDeSuppression()
            closeModale()
          }"/>
        </div>
      </template>
    </UCard>
  </UModal>
</template>