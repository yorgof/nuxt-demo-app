<template>
  <div class="flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input
              type="text"
              id="name"
              v-model="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
          />
          <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
          />
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
          />
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const errors = ref({});
const toast = useToast();

const handleSignup = async () => {
  errors.value = {};
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name.value, email: email.value, password: password.value}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error?.issues) {
        errorData.error.issues.forEach(issue => {
          errors.value[issue.path[0]] = issue.message;
        });
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.success('Account created successfully.');
    }
  } catch (error) {
    console.error(error.message);
    toast.error('An error occurred. Please try again.');
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>