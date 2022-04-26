<template>
  <header class="header flex justify-between items-center h-20 pr-6 fixed z-10">
    <div class="header_icon flex items-center">
      <span
        class="icon_menu material-icons p-4 mr-6 cursor-pointer"
        @click="
          () => {
            this.$emit('handleClick');
          }
        "
      >
        menu
      </span>
      <img
        alt="Vue logo"
        src="../assets/images/logo1.png"
        class="logo-header"
      />
    </div>
    <button class="button m-0" @click="handleLogout">Log out</button>
  </header>
</template>
<script>
export default {
  name: "Header-Main",
  emits: ["handleClick"],
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
header {
  .icon_menu {
    font-size: 30px;
  }
  background-color: aquamarine;
  transition: all 0.4s;
  right: 0px;
  left: 0px;
  &.active {
    left: 320px;
  }
  .logo-header {
    object-fit: cover;
    width: 200px;
  }
}
</style>
