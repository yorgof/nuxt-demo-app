<!-- components/Header.vue -->
<template>
  <header class="bg-blue-600 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">My Nuxt 3 App</h1>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li v-if="isLoggedIn">
            <a @click.prevent="handleLogout">Logout</a>
          </li>
          <li v-if="!isLoggedIn">
            <NuxtLink to="/login">Login</NuxtLink>
          </li>
          <li v-if="!isLoggedIn">
            <NuxtLink to="/signup">Signup</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const isLoggedIn = useState('isLoggedIn', () => false);
const toast = useToast();

const handleLogout = async () => {
  try {
    await fetch('/api/logout', { method: 'POST' });
    isLoggedIn.value = false;
    navigateTo('/login');
    toast.success('Logout successful.');
  } catch (error) {
    console.error('Logout failed:', error);
    toast.error('An error occurred. Please try again.');
  }
};
</script>

<style scoped>
</style>