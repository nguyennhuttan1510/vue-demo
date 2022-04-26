<template>
  <div class="h-fit flex">
    <div class="w-80 block sidebar" :class="{ active: isShowSidebar }">
      <div class="flex flex-col">
        <div class="flex flex-col h-60 justify-center items-center bg-gray-500">
          <span class="material-icons icon_account"> account_circle </span>
          <div class="text-base font-bold">Admin</div>
          <div class="text-gray-400">admin</div>
        </div>
        <div class="flex flex-col">
          <div class="pl-6 font-bold text-lg py-4 item-nav">
            <router-link :to="{ name: 'dashboard' }">
              <span class="block">Dashboard</span>
            </router-link>
          </div>
          <div class="pl-6 font-bold text-lg py-4 item-nav">
            <router-link :to="{ name: 'admin' }">
              <span class="block">Products</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="content" :class="{ active: isShowSidebar }">
      <HeaderMain
        :class="{ active: isShowSidebar }"
        @handleClick="handleClick"
      />
      <div class="h-fit">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderMain from "./Header-Main.vue";
export default {
  name: "Main-Layout",
  data() {
    return {
      isShowSidebar: true,
    };
  },
  components: {
    HeaderMain,
  },
  methods: {
    handleClick() {
      this.isShowSidebar = !this.isShowSidebar;
    },
  },
};
</script>
<style lang="scss" scoped>
.item-nav {
  transition: all 0.4s;
  cursor: pointer;
  span {
    transform: translateX(0rem);
    transition: all 0.4s;
  }
  &:hover {
    background-color: #c9fff6;
    span {
      transform: translateX(2rem);
    }
  }
}
.sidebar {
  position: fixed;
  z-index: 4;
  transition: all 0.4s;
  background-color: rgb(207 207 207);
  height: 100vh;
  transform: translateX(-100%);
  .icon_account {
    font-size: 100px;
  }
  &.active {
    transform: translateX(0%);
  }
}

.content {
  width: -webkit-fill-available;
  padding-left: 0px;
  transition: all 0.4s;
  &.active {
    padding-left: 320px;
  }
}
</style>
