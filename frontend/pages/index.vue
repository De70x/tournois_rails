<template/>
<script setup lang="ts">
const authCookie = useCookie('auth-token')

if (authCookie.value) {
  useRouter().push('/tournoi/liste')
} else {
  useRouter().push('/connexion')
}
</script>