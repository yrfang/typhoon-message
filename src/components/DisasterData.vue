<template lang="pug">
.DisasterData.tableList
  .row
    select.form-control(id="area-select",
           v-model="selectedArea")
      option(v-for="area in areas") {{ area }}
  br
  .row
    Pagination(:dataFilterByArea="dataFilterByArea")
  br
  .row
    DisasterTable(:headings="headings",
                  :dataFilterByArea="dataFilterByArea",)
</template>

<script>
import axios from 'axios';

import Pagination from '@/components/Pagination';
import DisasterTable from '@/components/DisasterTable';

const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  components: { DisasterTable, Pagination, },
  data() {
    return {
      areas: ['全部','萬華區','中正區','大同區','中山區','大安區','南港區','文山區','松山區','信義區','士林區','北投區','內湖區'],
      selectedArea: '全部',
      disasterData: [],
      headings: ["CaseTime", "CaseLocationDistrict", "CaseLocationDescription", "PName"],
    };
  },
  mounted() {
    this.getData();
    //this.$refs.paginate.selected = 20;
    // console.log(this.$refs.paginate.selected );
  },
  computed: {
    dataFilterByArea() {
      const selectedArea = this.selectedArea;
      return this.disasterData.filter((data) => {
        if (selectedArea == '全部') return data;
        if (data.CaseLocationDistrict.indexOf(selectedArea) > -1) return this.disasterData;
      });
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
.tableList
  margin-left: auto
  margin-right: auto
  padding: 10px
</style>
