<script setup lang="ts">
import {type Tournoi} from "~/types/Tournoi";
import type {FormSubmitEvent} from "#ui/types";
import {useTournoisStore} from "~/stores/useTournoisStore";
import {computedAsync} from "@vueuse/core";
import {usePermissionsStore} from "~/stores/usePermissionsStore";

definePageMeta({
  name: 'Creation_Tournoi'
})

const {$api} = useNuxtApp()
const tournoisStore = useTournoisStore($api);
const {hasPermission} = usePermissions()
const annee = new Date().getFullYear()

const state = reactive({
  nom: '',
});

const handleSubmit = async (event: FormSubmitEvent<Tournoi>) => {
  await tournoisStore.createTournoi({...event.data, annee})
  await navigateTo({name: 'Liste_Tournois'});
};

const hasPerm = computedAsync(async () => await hasPermission('edit'), false)

</script>

<template>
  <TournoiGuard>
    <UCard class="max-h-auto mx-auto max-w-xl w-full">
      <UForm :state="state" class="space-y-4" @submit="handleSubmit">
        <UFormGroup label="nom" name="nom">
          <UInput v-model="state.nom"/>
        </UFormGroup>
        <UButton type="submit" v-if="hasPerm">
          Créer Tournoi
        </UButton>
      </UForm>
    </UCard>
  </TournoiGuard>
</template>
