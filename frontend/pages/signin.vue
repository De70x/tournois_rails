<template>
  <div>
    <h1>Sign In</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" required>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" required>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await axios.post('/users/signin', {
      email: email.value,
      password: password.value
    });
    console.log('Sign-in response:', response);
    // Redirect the user to the dashboard or home page after successful sign-in
    router.push('/');
  } catch (error) {
    console.error('Sign-in error:', error);
  }
};
</script>
