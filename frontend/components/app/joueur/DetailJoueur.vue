<script setup lang="ts">
import {useJoueursStore} from "~/stores/useJoueursStore";
import ListeMatchs from "~/components/app/match/ListeMatchs.vue";
import {useTagsStore} from "~/stores/useTagsStore";
import {useNuxtApp} from "nuxt/app";

const {$api} = useNuxtApp()
const {getJoueurById, ajouterTag} = useJoueursStore($api)
const {tags} = useTagsStore($api)

const route = useRoute()
const id = Array.isArray(route.params.joueur_id) ? route.params.joueur_id[0] : route.params.joueur_id

const joueur = getJoueurById.value(Number(id));

const selected = ref<number>(joueur?.tag_id ?? -1)

const options = tags.value.map(tag => ({
  value: tag.id,
  label: tag.nom,
  icon: tag.icon
}))

options.push({icon: 'heroicons-minus-circle', label: 'Aucun', value: -1})

const handleSelectionChange = (newValue: any) => {
  if (joueur)
    ajouterTag(joueur, newValue === -1 ? null : newValue)
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Détail de <strong>{{ joueur?.nom}}</strong></p>
  <URadioGroup
      legend="Tag"
      v-model="selected"
      :options="options"
      @update:model-value="handleSelectionChange"
  >
    <template #label="{ option }">
      <div class="flex items-center">
        <UIcon :name="option.icon" class="mr-2"/>
        {{ option.label }}
      </div>
    </template>
  </URadioGroup>
  <ListeMatchs :matchs="joueur!.matchs"/>
  </div>
</template>

<style scoped>

</style>