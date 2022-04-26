<template lang="html">
    <div class="table-component">
        <table class="table w-full">
            <thead>
                <tr>
                    <th v-show="header.length > 0" v-for="item in header" :key="item.key">
                        {{ item.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="data.length > 0" v-for="(rowItem, index) in data" :key="index">
                    <td v-for="(headerItem, key) in header" :key="key">

                        {{
                        headerItem?.render ? <span v-html="headerItem?.render(rowItem[headerItem.key])"></span> :
                        rowItem[headerItem.key]
                        }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "Table-Component",
        props: ["header", "data"],
    };
</script>
<style lang="scss"></style>