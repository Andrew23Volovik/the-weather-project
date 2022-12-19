<template>
  <div class="card" :style="styleObj">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TheCardComponent',
  props: {
    color: {
      type: String,
    },
  },
  data() {
    return {
      styleObj: {
        backgroundColor: this.color,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 2rem;
  background-color: $third-color;
  border-radius: 1rem;
  border: 1px solid rgba($second-color, 0.05);
  box-shadow: 2px 2px 5px rgba(243, 246, 244, 0.1);
}
@media (max-width: 1200px) {
}

@media (max-width: 992px) {
  .card {
    padding: 1.75rem;
  }
}

@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }
}

@media (max-width: 481px) {
  .card {
    padding: 1rem;
  }
}

@media (max-width: 320px) {
}
</style>
