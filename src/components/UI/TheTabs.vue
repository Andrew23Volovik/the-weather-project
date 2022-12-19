<template>
  <div>
    <div class="tabs">
      <ul>
        <li
          v-for="(tab, idx) in tabs"
          :key="idx"
          :class="{ 'router-link-active': tab.isActive }"
        >
          <router-link
            tag="a"
            :to="{ path: tab.path }"
            @click="selectedTab(idx)"
            >{{ tab.name }}</router-link
          >
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTabsComponent',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectedTab(index) {
      this.tabs.forEach((el, idx) => {
        el.isActive = idx === index;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;

  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    flex-shrink: 0;
    border-bottom: 1px solid $second-color;

    li {
      display: block;
      a {
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: -1px;
        padding: 0.5rem 1rem;
        color: $second-color;
        font-size: 1.25rem;
        line-height: 1.25rem;
        font-weight: 500;
        border-bottom: 1px solid $second-color;
        transition: 0.4s all ease;
        &:hover {
          color: rgba($second-color, 0.7);
          border-bottom-color: rgba($third-color, 0.7);
        }
      }
      a.router-link-active {
        color: $fourth-color;
        border-bottom-color: $fourth-color;
      }
    }
  }
}
</style>