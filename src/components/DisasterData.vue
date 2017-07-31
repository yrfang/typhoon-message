<template lang="pug">
.DisasterData
  table.table
    thead
      tr
        th 日期時間
        th 區域名稱
        th 地點
        th 事故描述
    tbody
      tr(v-for="area in areas")
        td {{area.value}}
        td {{area.label}}
</template>

<script>
const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  // components: { DisasterTable },
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
  mounted() {
    var vobj = this;
    // $.ajax({
    //   url: DisasterApiUrl,
    //   success: function(result) {
    //     vobj.disasterData = JSON.parse(result);
    //     console.log(vobj.disasterData);
    //   }
    // });
  },
  methods: {

  }
}
</script>

<style lang="sass">
.table
  text-align: left
  width: 80%
  margin-left: auto
  margin-right: auto
</style>
