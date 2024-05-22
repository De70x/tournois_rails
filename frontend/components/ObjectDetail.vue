<!-- components/ObjectDetails.vue -->
<template>
  <UCard>
    <h3>{{ objectType }} Details</h3>
    <form @submit.prevent="saveAll">
      <div v-for="(value, key) in localObject" :key="key" class="flex">
        <label :for="`${key}`" class="text-primary m-1">{{ key }}</label>
        <EditableProperty
            :objectType="objectType"
            :property="key"
            :value="value"
            :propertyType="getInputType(schema, key)"
            @update="updateProperty(key, $event)"
            class="m-1"
        />
      </div>
      <UButton type="submit">Save All</UButton>
    </form>
  </UCard>
</template>

<script setup lang="ts">
import {getInputType, getSchema} from '@/utils/typeMapper';
import EditableProperty from '@/components/EditableProperty.vue';

const props = defineProps<{
  objectType: string;
  object: Record<string, any>;
}>();

const localObject = reactive({ ...props.object });

// Load the appropriate schema based on the objectType
const schema = getSchema(props.objectType)
// Add more schemas as needed

const updateProperty = (key: string | number, value: any) => {
  localObject[key] = value;
};

const saveAll = async () => {
  // Save localObject to the backend
  console.log('Saving object:', localObject);
  // Implement the actual save logic here
};
</script>

<style scoped>
</style>
