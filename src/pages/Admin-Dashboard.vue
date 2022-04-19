<template lang="html">
  <div class="px-6">
    <HeaderMain />
    <div class="mb-10">
      <ProductManagement />
    </div>
  </div>
</template>
<script>
  import HeaderMain from "../layouts/Header-Main";
  import ProductManagement from "../components/ProductManagement";
  export default {
    data() {
      return {};
    },
    components: {
      HeaderMain,
      ProductManagement,
    },
    created() {

    },
  };
</script>
<style lang="scss"></style>