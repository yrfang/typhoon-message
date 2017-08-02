<template lang="pug">
.DisasterData.tableList
  .row.navInformation
    .col-xs-12
      a 災情更新
      a 災情位置
  .row
    h5.col-xs-12 災害統計({{ dataCount }})
  .row
    Paginate(:page-count="20",
             :page-range="3",
             :margin-pages="2",
             :containerClass="'pagination'",
             :clickHandler="clickCallback",
             ref="paginate")
  .row
    DisasterTable(:dataRow="disasterData",
                  :headingsRow="headings",
                  :areasName="areas",
                  :key="disasterData.id")
</template>

<script>
import axios from 'axios';

import Paginate from 'vuejs-paginate';

import DisasterTable from '@/components/DisasterTable';

const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  components: { DisasterTable, Paginate },
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
      // selectedArea: '',
      disasterData: [],
      headings: ["CaseTime", "CaseLocationDistrict", "CaseLocationDescription", "PName"],
    };
  },
  mounted() {
    this.getData();
    //this.$refs.paginate.selected = 20;
    console.log(this.$refs.paginate.selected );
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
    clickCallback: function(page) {
      console.log('hello');
      console.log(page)
      console.log(this.$refs.paginate.selected);
    },
  }
}
</script>

<style lang="sass">
.tableList
  margin-left: auto
  margin-right: auto
  padding: 20px

  .row.navInformation
    margin-bottom: 20px

    a
      margin-right: 10px
      font-size: 18px
</style>
