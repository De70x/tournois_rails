<script setup lang="ts">
import {useTournoisStore} from "~/store/tournois_store";
import type {Tableau} from "~/types/Tableau";
import {useTagsStore} from "~/store/tags_store";
import type {Tag} from "~/types/Tag";

const tagsStore = useTagsStore();
const {tournoiActif} = useTournoisStore();

const fields = [
  {key: 'id', label: 'ID', type: 'number'},
  {key: 'nom', label: 'Nom', type: 'text'},
  {key: 'icon', label: 'Icone', type: 'icon'},
];

const createTag = async (tag: Partial<Tag>) => {
  await tagsStore.createTag(tag as Tag);
};

const editTag = async (stade: Tableau) => {
  await tagsStore.editTag(stade);
};

const deleteTag = async (id: number) => {
  await tagsStore.deleteTag(id);
};


console.log(tagsStore.tags)

</script>

<template>
  <GenericCRUD
      :items="tagsStore.tags.value"
      store-name="tags"
      item-name="tag"
      :fields="fields"
      :create-item="createTag"
      :edit-item="editTag"
      :delete-item="deleteTag"
  />
</template>