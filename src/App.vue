<template>
  <div id="app">
    <TheHeader></TheHeader>
    <TheMain></TheMain>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import TheHeader from '@/components/TheHeader.vue';
import TheMain from '@/components/TheMain.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
  methods: {
    ...mapActions(['getLocalStorageData']),
  },
  mounted() {
    this.getLocalStorageData();
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Quicksand', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .container {
    max-width: 992px;
    margin: 0 auto;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 450px;
    margin: 0 auto;
  }
}

@media (max-width: 481px) {
  .container {
    max-width: 320px;
    margin: 0 auto;
  }
}

@media (max-width: 320px) {
  .container {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>
