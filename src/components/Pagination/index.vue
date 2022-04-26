<template lang="html">
    <div class="pagination">
        <paginate :page-count="totalPage" :page-range="3" :margin-pages="3" :click-handler="onHandleChangePage"
            :prev-text="'Prev'" :next-text="'Next'">
        </paginate>
    </div>
</template>
<script>
    import Paginate from "vuejs-paginate-next";
    export default {
        name: "Pagination-Component",
        emits: ["onHandleChangePage"],
        props: ["totalItem", "itemPerPage"],
        components: {
            Paginate
        },
        computed: {
            totalPage() {
                return Math.floor(
                    this.totalItem / this.itemPerPage +
                    (this.totalItem % this.itemPerPage === 0 ? 0 : 1)
                );
            },
        },
        methods: {
            onHandleChangePage(pageNum) {
                this.$emit("onHandleChangePage", pageNum);
            },
        },
    };
</script>
<style lang="scss"></style>