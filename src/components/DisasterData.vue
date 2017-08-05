<template lang="pug">
.DisasterData.tableList
  .row.bar
    .alert.alert-info.col-xs-12
      p 防災災情及相關諮詢電話：87863119分機8900~8907
      p 目前尚未處理完成的災情：{{ dataUncompleteCount }} 件
  .row.bar
    select.col-xs-12.col-md-6.selectedArea(v-model="selectedArea")
      option(v-for="area in areas") {{ area }}
    select.col-xs-12.col-md-6.seletedPage(v-model="pagination.pageCount")
      option(v-for="length in pageLength",
             v-bind:value="length.value") {{length.text}}
  Pagination(:dataFilterByArea="dataFilterByArea",
             :pageLength="pageLength",
             :pagination="pagination",
             :totalPage="totalPage",)
  br
  .row
    DisasterTable(:headings="headings",
                  :dataFilterByArea="dataFilterByArea",
                  :buildPage="buildPage")
</template>

<script>
import axios from 'axios';

import Pagination from '@/components/Pagination';
import DisasterTable from '@/components/DisasterTable';

const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  components: { DisasterTable, Pagination },
  data() {
    return {
      areas: ['全部','萬華區','中正區','大同區','中山區','大安區','南港區','文山區','松山區','信義區','士林區','北投區','內湖區'],
      selectedArea: '全部',
      disasterData: [],
      headings: ["CaseTime", "CaseLocationDistrict", "CaseLocationDescription", "PName"],
      caseCount: 0,
      pageLength: [
        { text: "10 筆/頁", value: 10},
        { text: "20 筆/頁", value: 20},
        { text: "50 筆/頁", value: 50},
        { text: "100 筆/頁", value: 100},
      ],
      pagination: {
        range: 5,
        currentPage: 1,
        pageCount: 10,
        sliceTotalPage: [],
      },
    };
  },
  mounted() {
    this.getData();
    this.readyForPage();
  },
  computed: {
    dataFilterByArea() {
      const selectedArea = this.selectedArea;
      return this.disasterData.filter((data) => {
        if (selectedArea == '全部') return data;
        if (data.CaseLocationDistrict.indexOf(selectedArea) > -1) return this.disasterData;
      });
    },
    totalPage() {
      return Math.ceil(this.dataFilterByArea.length/this.pagination.pageCount);
    },
    buildPage() {
      if (this.pagination.currentPage > this.totalPage) {
        // console.log("no more data!");
        this.pagination.currentPage = 1;
      }
      var dataStart = (this.pagination.currentPage-1) * this.pagination.pageCount;
      var dataEnd = (this.pagination.currentPage) * this.pagination.pageCount;
      return this.dataFilterByArea.slice(dataStart, dataEnd);
    },
    dataUncompleteCount() {
      this.caseCount = 0;
      for (var i=0; i<this.dataFilterByArea.length; i++) {
        if (this.dataFilterByArea[i].CaseComplete == 'false') {
          this.caseCount += 1;
        }
      }
      return this.caseCount;
    },
  },
  methods: {
    getData() {
      axios.get(DisasterApiUrl).then((response) => {
        // console.log(response.data);
        // JSON responses are automatically parsed.
        this.disasterData = response.data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        // console.log(this.disasterData);
      }).catch((error) => { console.log(error); });
    },
    readyForPage() {
      this.pagination.currentPage=1;

      var dataStart = (this.pagination.currentPage-1) * this.pagination.pageCount;
      var dataEnd = (this.pagination.currentPage) * this.pagination.pageCount;
      return this.dataFilterByArea.slice(dataStart, dataEnd);
    },
  }
}
</script>

<style lang="sass">
.tableList
  position: fixed
  top: 80px
  left: 0px
  bottom: 0px
  overflow-x: hidden
  overflow-y: scroll

.bar
  padding-left: 20px
  padding-right: 20px

select.selectedArea
  height: 40px
  padding: 5px
  border: solid 1px #aaa

select.seletedPage
  height: 40px
  padding: 5px
  // margin-top: 10px
  margin-bottom: 20px
  border: solid 1px #aaa

.alert-info
  width: 100%
.alert-info > p
  text-align: left
  margin: 0px
</style>
