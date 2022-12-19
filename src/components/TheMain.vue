<template>
  <main class="main">
    <div class="container">
      <TheTabs :tabs="tabs"></TheTabs>
    </div>
  </main>
</template>

<script>
import TheTabs from '@/components/UI/TheTabs.vue';

export default {
  name: 'TheMainComponent',
  components: {
    TheTabs,
  },
  data() {
    return {
      tabs: [
        {
          name: 'Home',
          isActive: true,
          path: '/the-weather-project/home',
        },
        {
          name: 'Favorite',
          isActive: false,
          path: '/the-weather-project/favorite',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 1rem;
  background: linear-gradient(0deg, $second-color 60%, $third-color 40%);
}
</style>