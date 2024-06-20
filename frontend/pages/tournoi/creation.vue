<script setup lang="ts">
import {tournoiSchema, type Tournoi} from "~/types/Tournoi";
import type {FormSubmitEvent} from "#ui/types";
import {useTournoisStore} from "~/store/tournois_store";

const router = useRouter();
const tournoisStore = useTournoisStore();
const annee = new Date().getFullYear()

const state = reactive({
  nom: undefined,
});

const handleSubmit = async (event: FormSubmitEvent<Tournoi>) => {
  await tournoisStore.createTournoi({...event.data, annee})
  await router.push("/tournoi/liste");
};
</script>

<template>
  <UCard class="max-h-auto mx-auto max-w-xl w-full">
    <UForm :schema="tournoiSchema" :state="state" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="Nom" name="nom">
        <UInput v-model="state.nom"/>
      </UFormGroup>
      <UButton type="submit">
        Créer Tournoi
      </UButton>
    </UForm>
  </UCard>
</template>
