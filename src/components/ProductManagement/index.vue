<template lang="html">
  <div class="wrap-product-management p-6 pt-10">
    <h1 class="mb-6 font-semibold text-2xl">Product Management</h1>
    <FilterComponent />
    <ListProductComponent />
  </div>
</template>
<script>
import FilterComponent from "./components/FilterComponent";
import ListProductComponent from "./components/ListProductComponent";
export default {
  name: "ProductManagement",
  components: {
    FilterComponent,
    ListProductComponent,
  },
};
</script>
<style lang="scss">
.wrap-product-management {
  background-color: rgb(236 236 236);
  margin: 0 -1.5rem;
}
</style>
