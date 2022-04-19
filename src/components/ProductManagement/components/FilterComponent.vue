<template lang="html">
    <div class="my-6">
        <div class="flex items-center ">
            <!-- <div class="item_filter "> -->
            <vSelect :value="filter.make" @input="handleFilter" :options="options" defaultValue="Pick a value">
            </vSelect>
            <!-- </div> -->
            <vSelect :value="make" @input="handleFilter" :options="options" placeholder="Pick a value">
            </vSelect>
            <vSelect :value="make" @input="handleFilter" :options="options" placeholder="Pick a value">
            </vSelect>
            <vSelect :value="make" @input="handleFilter" :options="options" placeholder="Pick a value">
            </vSelect>
        </div>
    </div>
</template>
<script>
    // import Multiselect from 'vue-multiselect'
    import 'vue-select/dist/vue-select.css';
    import vSelect from 'vue-select'
    export default {
        data() {
            return {
                filter: {
                    date: '',
                    make: '',
                    model: '',
                    trim: '',
                    productType: '',
                    productLocation: '',
                    author: '',
                    status: '',
                    updateAt: '',
                    updateBy: '',
                    keySearch: '',
                },
                options: ['all', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched']
            }
        },
        components: {
            vSelect,
        },
        methods: {
            handleFilter(e) {
                console.log("🚀 ~ file: FilterComponent.vue ~ line 25 ~ handleFilter ~ e", e)


            }
        },
    };
</script>
<style lang="scss"></style>