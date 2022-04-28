<template>
  <!-- <div style="overflow-x: auto;"> -->
  <div v-if="listProduct.length === 0 && !$store.state.products.loading">
    <img
      :style="{ width: '500px' }"
      src="@/assets/images/empty_data.png"
      alt="empty"
    />
  </div>
  <div v-else>
    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, index) in columns" :key="index">
            <div v-if="header.key === 'location'" class="text-center">
              {{ header.name }}
            </div>
            <div v-else-if="header.key === 'used_distance'" class="text-right">
              {{ header.name }}
            </div>
            <div v-else-if="header.key === 'seller'" class="text-left">
              {{ header.name }}
            </div>
            <div v-else-if="header.key === 'brand'" class="text-left">
              {{ header.name }}
            </div>
            <div
              v-else-if="header.key === 'sales_status'"
              :style="{ 'min-width': '170px' }"
            >
              {{ header.name }}
            </div>
            <div
              v-else-if="
                header.key === 'status_latest_datetime' ||
                header.key === 'updated_at'
              "
              class="w-24"
            >
              {{ header.name }}
            </div>
            <span v-else>{{ header.name }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in listProduct"
          :key="key"
          :class="{ 'opacity-30': item['sales_status'] === 'in review' }"
        >
          <td v-for="(header, keyTd) in columns" :key="keyTd">
            <img
              v-if="header.key === 'default_image'"
              alt="product"
              :src="item[header.key]"
              class="logo image_product object-cover"
            />
            <span v-else-if="header.key === 'id'" class="font-bold">{{
              item[header.key]
            }}</span>
            <span v-else-if="header.key === 'seller'">
              <div class="flex flex-col">
                <div class="text-base font-bold">
                  {{ item[header.key]["name"] }}
                </div>
                <div>{{ item[header.key]["type"] }}</div>
              </div>
            </span>
            <div v-else-if="header.key === 'brand'">
              <div>
                <img
                  alt="brand"
                  :src="item[header.key]['logo']"
                  class="logo image_product object-cover"
                />
              </div>
              <div>{{ item[header.key]["name"] }}</div>
            </div>
            <span v-else-if="header.key === 'used_status'">
              <div
                :class="[
                  'rounded-full text-center px-4 py-1 text-white font-bold',
                  item[header.key] === 'new' ? 'bg-black' : 'bg-teal-400',
                ]"
              >
                {{ item[header.key] }}
              </div>
            </span>
            <span v-else-if="header.key === 'model'">
              <div class="flex flex-col">
                <div class="text-base font-bold">{{ item["model_name"] }}</div>
                <div>{{ item["model_detail"] }}</div>
              </div>
            </span>
            <div
              v-else-if="header.key === 'location'"
              class="whitespace-nowrap text-center"
            >
              {{ item[header.key] ? item[header.key] : "__" }}
            </div>
            <div
              v-else-if="header.key === 'used_distance'"
              class="text-right whitespace-nowrap"
            >
              <span v-if="item[header.key] == 0">__</span>
              <span v-else class="font-bold"
                >{{ item[header.key] }} <span>km</span></span
              >
            </div>
            <div v-else-if="header.key === 'price'" class="font-bold">
              {{ formatCurrency(item[header.key]) }}
            </div>
            <div v-else-if="header.key === 'created_by'" class="text-center">
              __
            </div>
            <div
              v-else-if="
                header.key === 'status_latest_datetime' ||
                header.key === 'created_at' ||
                header.key === 'updated_at'
              "
              class="text-center"
            >
              {{ formatFullDate(item[header.key]) }}
            </div>
            <div v-else-if="header.key === 'sales_status'" class="text-center">
              <SelectComponent
                v-if="item[header.key] === 'ing'"
                :options="[
                  { key: -1, name: 'All' },
                  { key: 'ing', name: 'On Selling' },
                  { key: 'in review', name: 'In Review' },
                  { key: 'blocked', name: 'Blocked' },
                ]"
                :isStatePrivate="true"
                :selected="item[header.key]"
                :productItem="item"
                :reduce="(options) => options.key"
                @onChangeSelect="handleChangeStatusProduct"
              />

              <span v-else class="font-bold text-lg capitalize">
                {{ option[item[header.key]] }}</span
              >
            </div>
            <span v-else>{{ item[header.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- </div> -->
    <Paginate
      :totalItem="totalItem"
      :itemPerPage="50"
      @onHandleChangePage="onHandleChangePage"
    >
    </Paginate>
  </div>
</template>
<script>
import { mapActions } from "vuex";

import { OPTION_PRODUCT_STATUS } from "@/constants/index";
import { formatCurrency, formatFullDate } from "@/constants/formatData.js";
import SelectComponent from "@/components/SelectComponent";
import Paginate from "@/components/Pagination";

export default {
  name: "ListProductComponent",
  emits: ["onHandleChangePage"],
  props: ["listProduct", "totalItem"],
  components: {
    Paginate,
    SelectComponent,
  },
  data() {
    return {
      columns: [
        { name: "ID", key: "id" },
        { name: "Picture", key: "default_image" },
        { name: "Subject", key: "seller" },
        { name: "Product Type", key: "used_status" },
        { name: "Make", key: "brand" },
        { name: "Model(Trim)", key: "model" },
        { name: "Category", key: "category" },
        { name: "Location", key: "location" },
        { name: "Release Year", key: "release_year" },
        { name: "Used Distance", key: "used_distance" },
        { name: "Price (VNĐ) ", key: "price" },
        { name: "Registered Date ", key: "created_at" },
        { name: "Created By", key: "created_by" },
        { name: "Last updated at ", key: "status_latest_datetime" },
        { name: "Status updated at ", key: "updated_at" },
        { name: "Status updated by", key: "status_latest_user" },
        { name: "Status", key: "sales_status" },
      ],
    };
  },
  computed: {
    option() {
      return OPTION_PRODUCT_STATUS;
    },
    productStatusOption() {
      const needOption = ["in review", "blocked", "ing"];
      let arrayKey = Object.keys(OPTION_PRODUCT_STATUS);
      const result = arrayKey
        .filter((e) => needOption.includes(e))
        .map((key) => ({
          key: key,
          name: OPTION_PRODUCT_STATUS[key],
        }));
      return [{ key: -1, name: "All" }, ...result];
    },
  },
  methods: {
    ...mapActions(["updateStatusProduct"]),
    formatCurrency,
    formatFullDate,
    async handleChangeStatusProduct(params) {
      this.updateStatusProduct(params);
    },
    onHandleChangePage(pageNum) {
      this.$emit("onHandleChangePage", pageNum);
    },
  },
};
</script>
<style scoped lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

th,
td {
  border-bottom: 1px solid #ddd;
}

.image_product {
  width: 50px;
  height: 50px;
}

td {
  padding: 1rem;
}

th {
  padding: 1rem;
}

tbody {
  tr {
    vertical-align: middle;

    &:nth-child(2n + 1) {
      background-color: #f5fffd;
    }

    &:hover {
      background-color: #c9fff6;
    }
  }
}
</style>
