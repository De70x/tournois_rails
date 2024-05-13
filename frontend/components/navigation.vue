<script setup lang="ts">
const route = useRoute()

const links = [{
  label: 'Profile',
  avatar: {
    src: '/tennis.png'
  },
  to: '/'
}, {
  label: 'Installation',
  icon: 'i-heroicons-home',
  to: '/getting-started/installation'
}, {
  label: 'Horizontal Navigation',
  icon: 'i-heroicons-chart-bar',
  to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/horizontal-navigation`
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/components/command-palette'
}]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
</template>