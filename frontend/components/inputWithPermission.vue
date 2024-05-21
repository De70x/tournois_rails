<script setup lang="ts">

import {usePermissionsStore} from "~/store/permissions_store";

const props = defineProps<{ propertyName: string }>();
const objectType = inject('objectType') as string;
const object = inject('object') as Record<string, any>;

const permissionsStore = usePermissionsStore();
const isEditing = ref(false);
const editableValue = ref('');

function hasPermission(action: string) {
  if (action === 'view') {
    return permissionsStore.permissions.includes(`${action}_${objectType}`);
  }
  return permissionsStore.permissions.includes(`${action}_${objectType}_${props.propertyName}`);
}

const enableEdit = () => {
  if (hasPermission('edit')) {
    isEditing.value = true;
    editableValue.value = object._rawValue[props.propertyName];
  }
};

const saveEdit = () => {
  if (isEditing.value) {
    object[props.propertyName] = editableValue.value;
    isEditing.value = false;
    // Optionally send an update request to the backend to save changes
  }
};
</script>

<template>
  <div v-if="hasPermission('view')">
    <span v-if="!isEditing && hasPermission('edit')" @dblclick="enableEdit">{{ object[propertyName] }}</span>
    <span v-else-if="!isEditing">{{ object[propertyName] }}</span>
    <input v-else v-model="editableValue" @blur="saveEdit" @keyup.enter="saveEdit"/>
  </div>
</template>

<style scoped>

</style>