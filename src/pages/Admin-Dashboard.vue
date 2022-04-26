<template lang="html">
  <MainLayout>
    <ProductManagement />
  </MainLayout>
</template>

<script>
import { mapState } from "vuex";
import MainLayout from "../layouts/MainLayout";
import ProductManagement from "../components/ProductManagement";
export default {
  data() {
    return {
      isShowSidebar: true,
    };
  },
  components: {
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
