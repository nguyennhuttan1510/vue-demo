<template lang="html">
  <div class="my-6">
    <div class="flex">
      <DatepickerComponent
        style="min-width: 345px"
        title="Registration date"
        :keyParams="{ start: 'start_date', end: 'end_date' }"
        @changeDataPicked="setValues"
      />
      <SelectComponent
        :reduce="(options) => options.id"
        :options="brandsOption"
        title="Made"
        v-model="filterQuery.brand_id"
      />
      <SelectComponent
        :disabled="filterQuery.brand_id === -1"
        :classname="filterQuery.brand_id === -1 ? 'opacity-50' : ''"
        :reduce="(options) => options.id"
        :options="this.modelsOption"
        title="Model"
        v-model="filterQuery.model_id"
      />
      <SelectComponent
        :disabled="filterQuery.model_id === -1"
        :classname="filterQuery.model_id === -1 ? 'opacity-50' : ''"
        :reduce="(options) => options.id"
        :options="this.trimOption"
        title="Trim"
        v-model="filterQuery.detail_model_id"
      />
      <SelectComponent
        :reduce="(options) => options.key"
        :options="this.productTypeOption"
        title="Product Type"
        v-model="filterQuery.type"
      />
      <SelectComponent
        :reduce="(options) => options.id"
        :options="this.locationOption"
        title="Product Location"
        v-model="filterQuery.location_id"
      />
      <SelectComponent
        :reduce="(options) => options.id"
        :options="this.createdByOption"
        title="Created By"
        v-model="filterQuery.created_by"
      />
      <SelectComponent
        :reduce="(options) => options.key"
        :options="this.productStatusOption"
        title="Product Status"
        v-model="filterQuery.sales_status"
      />
      <DatepickerComponent
        style="min-width: 345px"
        title="Status Update At"
        @changeDataPicked="setValues"
        :keyParams="{
          start: 'status_latest_datetime_from',
          end: 'status_latest_datetime_to',
        }"
      />
      <SelectComponent
        :reduce="(options) => options.id"
        :options="this.createdByOption"
        title="Status Update By"
        v-model="filterQuery.status_latest_user"
      />
      <div>
        <div class="mb-2">this is title</div>
        <input class="search" type="text" v-model="q" />
      </div>
    </div>
  </div>
</template>
<script>
import "vue-select/dist/vue-select.css";
import SelectComponent from "../../../components/SelectComponent";
import DatepickerComponent from "@/components/Datepicked/Datepicked.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: [
    "brandsOption",
    "modelsOption",
    "trimOption",
    "productTypeOption",
    "locationOption",
    "createdByOption",
    "productStatusOption",
  ],
  data() {
    return {
      filterQuery: {
        brand_id: -1,
        model_id: -1,
        detail_model_id: -1,
        type: -1,
        location_id: -1,
        created_by: -1,
        sales_status: -1,
        start_date: -1,
        end_date: -1,
        status_latest_user: -1,
        q: "",
      },
    };
  },
  watch: {
    filterQuery: {
      handler(newValue) {
        this.$emit("onFilterProduct", { ...newValue, page: 1 });
      },
      deep: true,
    },
    "filterQuery.brand_id"(newState, oldState) {
      if (newState !== oldState) {
        if (newState !== -1) {
          this.getModels(newState);
          if (this.trim?.length === 0) return;
          this.setTrim([]);
        }
        this.filterQuery.model_id = -1;
        this.filterQuery.detail_model_id = -1;
      }
    },
    "filterQuery.model_id"(newState, oldState) {
      if (newState !== oldState) {
        if (newState !== -1) {
          this.getModelDetail(newState);
        }
        this.filterQuery.detail_model_id = -1;
      }
    },
  },
  components: {
    SelectComponent,
    DatepickerComponent,
  },
  methods: {
    ...mapActions([
      "getBrands",
      "getProducts",
      "getModels",
      "getModelDetail",
      "getUsers",
      "getCities",
    ]),
    ...mapMutations(["setInitTrim", "setTrim"]),

    setValues(params) {
      this.filterQuery = { ...this.filterQuery, ...params };
    },
    dropdownShouldOpen(VueSelect) {
      if (this.country !== null) {
        return VueSelect.open;
      }
      return VueSelect.search.length !== 0 && VueSelect.open;
    },
  },
  computed: {
    ...mapState(["products", "trim", "cities"]),
  },
};
</script>
<style scoped lang="scss">
.search {
  height: 47%;
  padding: 0 1rem;
  border: thin solid rgba(60, 60, 60, 0.26);
}
</style>
