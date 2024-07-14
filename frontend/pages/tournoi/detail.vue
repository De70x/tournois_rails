<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
import ListeJoueursSansPoule from "~/components/app/joueur/ListeJoueursSansPoule.vue";
import ListePoules from "~/components/app/poule/ListePoules.vue";

const tournoisStore = useTournoisStore()

if (!tournoisStore.tournoiActif.id) {
  useRouter().push("liste")
}

</script>

<template>
  <NuxtLayout>
    <template #header>
      <h1 class="text-xl">{{ tournoisStore.tournoiActif.nom }} | {{ tournoisStore.tournoiActif.annee }}</h1>
    </template>
    <template #default>
      <div class="grid grid-cols-[300px_minmax(500px,_1fr)] gap-10 w-full p-10">
        <ListeJoueursSansPoule/>
        <ListePoules/>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>