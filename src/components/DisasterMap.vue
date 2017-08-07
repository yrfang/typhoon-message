<template lang="pug">
.DisasterMap
  h4 Hi, google map coming soon...
  #map
//- <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
</template>

<script>
import axios from 'axios';

const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  data() {
    return {
      disasterData: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get(DisasterApiUrl).then((response) => {
        this.disasterData = response.data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        console.log(this.disasterData);
      }).catch((error) => { console.log(error); });
    },
    mapReady() {
      
    },
  },
}
</script>

<style lang="sass">
.DisasterMap
  position: fixed
  top: 80px
  left: 0px
  bottom: 0px
  // overflow-x: hidden
  // overflow-y: scroll
  padding-left: 20px
  padding-right: 20px

h4
  color: red
</style>
