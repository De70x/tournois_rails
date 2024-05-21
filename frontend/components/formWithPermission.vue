<script setup lang="ts">
import { provide } from 'vue';

const props = defineProps<{ objectType: string }>();

provide('objectType', props.objectType);
</script>

<template>
  <div>
    <slot/>
  </div>
</template>

<style scoped>

</style>