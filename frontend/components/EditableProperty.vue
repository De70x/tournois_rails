<!-- components/EditableProperty.vue -->
<template>
  <div>
    <span v-if="!isEditing" @dblclick="enableEdit">{{ value }}</span>
    <UInput v-else v-model="editableValue" @keyup.enter="saveEdit" :type="propertyType"/>
  </div>
</template>

<script setup lang="ts">
import { hasPermission } from '@/utils/permissions';

const props = defineProps<{
  objectType: string;
  property: string | number;
  value: any;
  propertyType: string;
}>();

const emits = defineEmits(['update']);
const isEditing = ref(false);
const editableValue = ref(props.value);

const hasEditPermission = computed(() => {
  return hasPermission(`edit_${props.objectType}_${props.property}`);
});

const enableEdit = () => {
  if (hasEditPermission.value) {
    isEditing.value = true;
  }
};

const saveEdit = () => {
  isEditing.value = false;
  emits('update', editableValue.value);
};
</script>

<style scoped>
</style>
