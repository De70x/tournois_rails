<script setup lang="ts">
import {type Tournoi, tournoiSchema} from "~/types/Tournoi";
import type {FormSubmitEvent} from "#ui/types";
import {useTournoisStore} from "~/store/tournois_store";

const tournoisStore = useTournoisStore();
const annee = new Date().getFullYear()

const state = reactive({
  nom: '',
});

const handleSubmit = async (event: FormSubmitEvent<Tournoi>) => {
  await tournoisStore.createTournoi({...event.data, annee})
  await useRouter().push("/tournoi/liste");
};
</script>

<template>
  <UCard class="max-h-auto mx-auto max-w-xl w-full">
    <UForm :state="state" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="nom" name="nom">
        <UInput v-model="state.nom"/>
      </UFormGroup>
      <UButton type="submit">
        Créer Tournoi
      </UButton>
    </UForm>
  </UCard>
</template>
