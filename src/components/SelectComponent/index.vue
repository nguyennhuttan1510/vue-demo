<template lang="html">
  <div class="item_filter" :class="classname">
    <div class="mb-2 font-bold">
      <!-- <slot name="title" /> -->
      {{ title }}
    </div>
    <vSelect
      v-if="!isStatePrivate"
      class="w-full"
      label="name"
      v-bind="$attrs"
      :dropdown-should-open="dropdownShouldOpen"
    ></vSelect>
    <vSelect
      v-else
      class="w-full"
      label="name"
      v-bind="$attrs"
      v-model="changeSelect"
      :dropdown-should-open="dropdownShouldOpen"
    ></vSelect>
  </div>
</template>
<script>
import vSelect from "vue-select";

export default {
  name: "Select-Component",
  props: ["title", "classname", "isStatePrivate", "selected", "productItem"],
  emits: ["onChangeSelect"],
  inheritAttrs: false,
  components: {
    vSelect,
  },
  data() {
    return {};
  },
  computed: {
    changeSelect: {
      get() {
        return this.selected;
      },
      set(value) {
        console.log(
          "🚀 ~ file: index.vue ~ line 46 ~ set ~ this.selected",
          this.selected
        );
        const payload = {
          productID: this.productItem.id,
          sales_status: value,
        };
        this.$emit("onChangeSelect", payload);
      },
    },
  },
  methods: {
    dropdownShouldOpen(VueSelect) {
      if (this.country !== null) {
        return VueSelect.open;
      }
      return VueSelect.search.length !== 0 && VueSelect.open;
    },
  },
};
</script>
<style lang="scss">
.item_filter {
  min-width: 170px;
  max-width: 200px;
  margin: 0 1rem;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>
