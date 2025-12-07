<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import DefaultLayout from '@/layouts/DefaultLayout.vue';

  const layouts = {
    default: DefaultLayout,
  };

  const route = useRoute();

  // Вычисляем текущий layout
  const layoutComponent = computed(() => {
    const layout = route.meta.layout || 'default';
    return layouts[layout] || layouts.default;
  });
</script>

<template>
  <div class="page">
    <Header class="page__header" />
    <component :is="layoutComponent">
      <RouterView v-slot="{ Component, route }">
        <Transition name="app-fade" mode="out-in">
          <div v-if="Component" :key="route.matched[0].name" class="page-stage">
            <Suspense :key="route.matched[0].name">
              <component :is="Component"></component>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </component>
    <Footer class="page__footer" />
  </div>
</template>
