<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" required>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" required>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const {$api} = useNuxtApp();

const handleSubmit = async () => {
  try {
    const credentials: ILoginInput = {
      email,
      password
    };
    const response = await $api.get('/users/sign_up');
    console.log('Sign-up response:', response);
    // Redirect the user to the sign-in page after successful sign-up
    router.push('/signin');
  } catch (error) {
    console.error('Sign-up error:', error);
  }
};
</script>
