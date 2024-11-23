<template>
  <div class="min-h-screen">
    <header>
      <GlobalHeader/>
    </header>
    <main>
      <NuxtPage/>
    </main>
    <footer>
      <GlobalFooter/>
    </footer>
  </div>
</template>

<script setup>
// Global script
import GlobalFooter from "~/components/global-footer.vue";
import GlobalHeader from "~/components/global-header.vue";
</script>

<style scoped>
/* Global styles */
</style>
