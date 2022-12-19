<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__logo" @click="redirect">
          <mdicon name="weather-partly-cloudy" class="header__logo__icon" />
          <span>TW</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeaderComponent',
  methods: {
    redirect() {
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 4rem;
  background-color: $first-color;
  padding: 0.5rem;
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__logo {
    display: flex;
    cursor: pointer;
    svg {
      width: 48px;
      height: 48px;
    }
    &__icon {
      margin-right: 0.5rem;
      color: $second-color;
    }
    span {
      display: flex;
      align-items: center;
      color: $second-color;
      font-size: 48px;
      line-height: 48px;
      font-weight: 700;
    }
  }
}
@media (max-width: 1200px) {
}

@media (max-width: 992px) {
}

@media (max-width: 768px) {
  .header {
    height: 3rem;

    &__logo {
      cursor: pointer;
      svg {
        width: 32px;
        height: 32px;
      }

      span {
        font-size: 32px;
        line-height: 32px;
      }
    }
  }
}

@media (max-width: 481px) {
}

@media (max-width: 320px) {
}
</style>