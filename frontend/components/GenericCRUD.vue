<script setup lang="ts">
import {ref, reactive} from 'vue';
import type {FormSubmitEvent} from "#ui/types";
import {useModaleStore} from "~/store/modale_store";

const {openModale, configModale} = useModaleStore();

interface Props {
  items: any[];
  storeName: string;
  itemName: string;
  fields: { key: string; label: string; type: string }[];
  createItem: (item: any) => Promise<void>;
  editItem: (item: any) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

const props = defineProps<Props>();

const creationEnCours = ref(false);
const formState = reactive<Record<string, any>>({});

const resetForm = () => {
  props.fields.forEach(field => {
    formState[field.key] = field.key === 'id' ? -1 : '';
  });
};

const creation = () => {
  resetForm();
  creationEnCours.value = true;
};

const edition = (item: any) => {
  props.fields.forEach(field => {
    formState[field.key] = item[field.key];
  });
  creationEnCours.value = true;
};

const creationTerminee = async (event: FormSubmitEvent<any>) => {
  if (event.data.id === -1) {
    const {id, ...dataWithoutId} = event.data
    console.log(dataWithoutId)
    await props.createItem(dataWithoutId);
  } else {
    await props.editItem(event.data);
  }
  creationEnCours.value = false;
};

const supprimerItem = async (item: any) => {
  configModale({
    id: item.id,
    message: `Êtes vous certain de vouloir supprimer ${props.itemName} ${item.nom} ?`
  }, () => props.deleteItem(item.id));
  openModale();
};
</script>

<template>
  <div>
    <div class="m-2">
      <UButton @click="creation" variant="outline">Créer un {{ itemName }}</UButton>
      <UForm v-if="creationEnCours" :state="formState" @submit="creationTerminee">
        <div v-for="field in fields" :key="field.key">
          <UInput v-if="field.type === 'text'" v-model="formState[field.key]" :label="field.label"></UInput>
          <UCheckbox v-else-if="field.type === 'boolean'" v-model="formState[field.key]"
                     :label="field.label"></UCheckbox>
        </div>
        <UButton type="submit">Valider</UButton>
      </UForm>
    </div>
    <div class="flex gap-2">
      <UCard v-for="item in items" :key="item.id" @dblclick="edition(item)" class="w-1/4">
        <template #header>
          <div class="flex items-center justify-between w-full">
            <div class="w-10"></div>
            <h3 class="text-base font-semibold leading-6">{{ item.nom }}</h3>
            <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="supprimerItem(item)"/>
          </div>
        </template>
        <div v-for="field in fields" :key="field.key">
          <p v-if="field.key !== 'id' && field.key !== 'nom'">{{ field.label }}: {{ item[field.key] }}</p>
        </div>
      </UCard>
    </div>
  </div>
</template>