<script setup>
  defineOptions({
    name: 'DefaultLayout',
  });
</script>

<template>
  <main class="page-content">
    <div class="page-content__wrapper">
      <slot />
    </div>
  </main>
</template>
