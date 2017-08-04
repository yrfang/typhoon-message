<template lang="pug">
.DisasterData.tableList
  .row
    select.form-control(id="area-select",
           v-model="selectedArea")
      option(v-for="area in areas") {{ area }}
  br
  .row
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
      pageLength: [
        { text: "20 筆/頁", value: 20},
        { text: "30 筆/頁", value: 30},
        { text: "50 筆/頁", value: 50},
        { text: "100 筆/頁", value: 100},
      ],
      pagination: {
        range: 5,
        currentPage: 1,
        pageCount: 20,
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
  margin-left: auto
  margin-right: auto
  padding: 10px
</style>
