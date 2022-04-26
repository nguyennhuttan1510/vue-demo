<template lang="html">
  <div class="flex flex-col mr-4">
    <div class="mb-2 font-bold">{{ title }}</div>
    <Datepicker v-model="date" range multiCalendars></Datepicker>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
export default {
  name: "Datapicker-Component",
  components: { Datepicker },
  data() {
    return {
      date: [new Date("2022-04-15"), new Date("2022-04-15")],
    };
  },
  watch: {
    date(newState, oldState) {
      if (newState !== oldState) {
        if (newState === null) {
          this.$emit("changeDataPicked", {
            [this.keyParams.start]: null,
            [this.keyParams.end]: null,
          });
          return;
        }
        const [start, end] = newState;
        const payload = {
          [this.keyParams.start]: start
            ? moment(start).format("YYYY-MM-DD")
            : null,
          [this.keyParams.end]: end ? moment(end).format("YYYY-MM-DD") : null,
        };
        this.$emit("changeDataPicked", payload);
      }
    },
  },
  props: ["title", "keyParams"],
};
</script>
<style lang="scss">
.date-picker-range {
  padding: 1rem;
  border: 1px solid #0000002e;
  border-radius: 5px;
}
</style>
