<template lang="html">
  <div class="wrap-product-management p-6 pt-24 h-full">
    <div class="p-6 bg-gray-50 w-full">
      <div class="flex justify-between">
        <div class="mb-6 font-semibold text-2xl">Product Management</div>
        <div class="font-semibold">
          About
          <span class="text-xl text-green-600"> {{ products.totalPage }}</span>
          result
        </div>
      </div>
      <FilterComponent
        :filterQuery="filterQuery"
        @onFilterProduct="onFilterProduct"
        :brandsOption="brandsOption"
        :modelsOption="modelsOption"
        :trimOption="trimOption"
        :productTypeOption="productTypeOption"
        :locationOption="locationOption"
        :createdByOption="createdByOption"
        :productStatusOption="productStatusOption"
      />
      <ListProductComponent
        :listProduct="products.productList"
        :totalItem="products.totalPage"
        @onHandleChangePage="onHandleChangePage"
      />
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapActions, mapState } from "vuex";
import FilterComponent from "./components/FilterComponent";
import ListProductComponent from "./components/ListProductComponent";
import { OPTION_PRODUCT_TYPE, OPTION_PRODUCT_STATUS } from "../../constants";

export default {
  name: "ProductManagement",
  components: {
    FilterComponent,
    ListProductComponent,
  },
  data() {
    return {
      totalItem: 0,
      currentPage: 1,
    };
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      if (newCurrentPage !== oldCurrentPage) {
        this.getProducts({ ...this.filterQuery, page: newCurrentPage });
      }
    },
  },
  computed: {
    defaultOption() {
      return [{ name: "All", id: -1 }];
    },
    ...mapState(["products", "trim", "cities"]),
    ...mapState({
      brandsOption(state) {
        if (!state.brands) return this.defaultOption;
        const arrayOption = state.brands?.map((e) => ({
          name: e.name,
          id: e.id,
        }));
        return [...this.defaultOption, ...arrayOption];
      },
      modelsOption(state) {
        state.model.model;
        if (!state.model.model || state?.model.model?.length === 0)
          return this.defaultOption;
        const modelOption = state?.model.model?.map((e) => ({
          name: e.name,
          id: e.id,
        }));
        return [...this.defaultOption, ...modelOption];
      },
      trimOption(state) {
        if (!state.trim || state?.trim?.length === 0) return this.defaultOption;
        const trimOption = state?.trim.map((e) => ({ name: e.name, id: e.id }));
        return [...this.defaultOption, ...trimOption];
      },
      createdByOption(state) {
        if (!state.users || state?.users?.length === 0)
          return this.defaultOption;
        const createByOption = state?.users.map((e) => ({
          name: e.full_name,
          id: e.id,
        }));
        return [...this.defaultOption, ...createByOption];
      },
      locationOption(state) {
        if (!state.cities || state?.cities?.length === 0)
          return this.defaultOption;
        const createByOption = state?.cities.map((e) => {
          const spliceString = e.name.split(" ").splice(3).join(" ");

          return {
            name: spliceString,
            id: e.id,
          };
        });
        return [...this.defaultOption, ...createByOption];
      },
    }),
    productTypeOption() {
      return Object.values(OPTION_PRODUCT_TYPE);
    },
    productStatusOption() {
      let arrayKey = Object.keys(OPTION_PRODUCT_STATUS);
      const result = arrayKey.map((key) => ({
        key: key,
        name: OPTION_PRODUCT_STATUS[key],
      }));
      return [{ key: -1, name: "All" }, ...result];
    },
  },
  methods: {
    ...mapActions(["getBrands", "getProducts", "getUsers", "getCities"]),

    onHandleChangePage(currentPage) {
      if (!currentPage) return;
      this.currentPage = currentPage;
    },

    onFilterProduct(params) {
      if (!params) return;
      this.getProducts(params);
    },
  },
  created() {
    this.getProducts();
    this.getBrands();
    this.getUsers();
    this.getCities();
  },
};
</script>
<style lang="scss">
.wrap-product-management {
  width: fit-content;
  background-color: rgb(236 236 236);
}
</style>
