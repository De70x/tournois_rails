<script setup lang="ts">
</script>

<template>
  <div class="m-auto">
    <Navigation/>
    <div class="main-content">
      <slot/>
    </div>
    <UNotifications />
  </div>
</template>

<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>