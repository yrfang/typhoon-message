<template lang="pug">
.DisasterData
  table.table
    thead
      tr
        th 區域名稱
    tbody
      tr(v-for="area in areas")
        td {{ area.value }}
</template>

<script>
export default {
  data() {
    return {
      areas: [
        {
          value: '全部',
          label: '全部',
        }, {
          value: '萬華區',
          label: '萬華區',
        }, {
          value: '中正區',
          label: '中正區',
        }, {
          value: '大同區',
          label: '大同區',
        }, {
          value: '中山區',
          label: '中山區',
        }, {
          value: '大安區',
          label: '大安區',
        }, {
          value: '南港區',
          label: '南港區',
        }, {
          value: '文山區',
          label: '文山區',
        }, {
          value: '松山區',
          label: '松山區',
        }, {
          value: '信義區',
          label: '信義區',
        }, {
          value: '士林區',
          label: '士林區',
        }, {
          value: '北投區',
          label: '北投區',
        }, {
          value: '內湖區',
          label: '內湖區',
        }],
      selectedValue: '',
      disasterData: [],
    };
  },

}
</script>

<style lang="sass">
.table
  text-align: left
  width: 80%
  margin-left: auto
  margin-right: auto
</style>
