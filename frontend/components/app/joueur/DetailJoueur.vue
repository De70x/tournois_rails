<script setup lang="ts">
import {useJoueursStore} from "~/store/joueurs_store";
import ListeMatchs from "~/components/app/match/ListeMatchs.vue";
import {useTagsStore} from "~/store/tags_store";

const {getJoueurById} = useJoueursStore()
const route = useRoute()
const id = Array.isArray(route.params.joueur_id) ? route.params.joueur_id[0] : route.params.joueur_id
const joueur = getJoueurById.value(Number(id));

const {tags} = useTagsStore()


</script>

<template>
  <div v-for="tag in tags">
    <UCheckbox :label="tag.nom" :value="tag.id"/>
  </div>
  <ListeMatchs :matchs="joueur!.matchs"/>
</template>

<style scoped>

</style>