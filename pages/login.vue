<!-- pages/Login.vue -->
<template>
  <div class="flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="form-group">
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div class="form-group">
          <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
          <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <button type="submit" class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const toast = useToast();

const handleLogin = async () => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email.value, password: password.value}),
    });

    if (response.ok) {
      // add the returned token to the local storage
      const { token } = await response.json();
      localStorage.setItem('token', token);
      // redirect to the dashboard
      await navigateTo('/')

      toast.success('Login successful.');
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error(error.message);
    toast.error('An error occurred. Please try again.');
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>