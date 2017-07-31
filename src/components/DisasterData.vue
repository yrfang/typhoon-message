<template lang="pug">
.DisasterData.container
  .row.navInformation
    .col-xs-12
      a 災情更新
      a 災情位置
  .row
    h4.col-xs-12 災害統計({{ dataCount }})
    DisasterTable(:dataRow="disasterData", :headingsRow="headings")
</template>

<script>
import axios from 'axios';

import DisasterTable from '@/components/DisasterTable';

const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  components: { DisasterTable },
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
      // rowKey: [ "日期時間", "區域名稱", "詳細地點", "事故描述"],
      headings: ["CaseTime", "CaseLocationDistrict", "CaseLocationDescription", "CaseDescription"
    ],
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    dataCount() {
      return this.disasterData.length;
    }
  },
  methods: {
    getData() {
      axios.get(DisasterApiUrl).then((response) => {
        // console.log(response.data);

        // JSON responses are automatically parsed.
        this.disasterData = response.data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        console.log(this.disasterData);
      }).catch((error) => { console.log(error); });
    },
  }
}
</script>

<style lang="sass">
.row.navInformation
  margin-bottom: 20px

  a
    margin-right: 10px
    font-size: 18px
</style>
