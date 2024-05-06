<template>
  <div>
    <h1>Sign In</h1>
    <form @submit.prevent="handleSubmit2">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" required>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" required>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const form = reactive<ILoginInput>({
  email: '',
  password: '',
});

const { $api } = useNuxtApp()

const handleSubmit2 = async () => {

  try {
    const credentials: ILoginInput = {
      email,
      password
    };

    const response = await $api.get('/users/sign_in');
    console.log(response)
// allow user access into the app
  } catch (error) {
    console.error(error);
  }

}

const handleSubmit = async () => {
  try {
    const foundUnits = await $api.get(
        `/entities/${entityId}/units`,
        this.fetchAllFilters.fetch_filters
    );

    const response = await apiWrapper.post('/users/sign_in', {email, password});
    console.log('Sign-in response:', response);
    // Redirect the user to the dashboard or home page after successful sign-in
    router.push('/signup');
  } catch (error) {
    console.error('Sign-in error:', error);
  }
};


</script>
