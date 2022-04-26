<template lang="html">
  <MainLayout>
    <ProductManagement />
  </MainLayout>
</template>

<script>
import { mapState } from "vuex";
// import HeaderMain from "../layouts/Header-Main";
import MainLayout from "../layouts/MainLayout";
import ProductManagement from "../components/ProductManagement";
export default {
  data() {
    return {
      isShowSidebar: true,
    };
  },
  components: {
    // HeaderMain,
    ProductManagement,
    MainLayout,
  },
  methods: {
    handleClick() {
      this.isShowSidebar = !this.isShowSidebar;
    },
  },
  computed: {
    ...mapState["account"],
  },
};
</script>
<style lang="scss"></style>
