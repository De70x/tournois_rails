<script setup lang="ts">
import GestionStades from "~/components/app/gestion/GestionStades.vue";
import GestionTags from "~/components/app/gestion/GestionTags.vue";
import GestionTableaux from "~/components/app/gestion/GestionTableaux.vue";

const items = [{
  slot: 'stades',
  label: 'Stades'
}, {
  slot: 'tagsJoueurs',
  label: 'Tags joueurs'
}, {
  slot: 'tableaux',
  label: 'Tableaux'
}]
</script>

<template>
  <TournoiGuard>
    <UTabs :items="items" class="w-full">
      <template #stades="{ item }">
        <h3 class="text-lg font-bold">
          {{ item.label }}
        </h3>
        <GestionStades/>
      </template>

      <template #tagsJoueurs="{ item }">
        <h3 class="text-lg font-bold">
          {{ item.label }}
        </h3>
        <GestionTags/>
      </template>

      <template #tableaux="{ item }">
        <h3 class="text-lg font-bold">
          {{ item.label }}
        </h3>
        <GestionTableaux/>
      </template>
    </UTabs>
  </TournoiGuard>
</template>

