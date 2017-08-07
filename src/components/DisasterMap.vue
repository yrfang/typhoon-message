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
      markers: [],
    }
  },
  mounted() {
    this.getPowerData();
  },
  methods: {
    getPowerData() {
      axios.get(DisasterApiUrl).then((response) => {
        this.disasterData = response.data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        // console.log(this.disasterData);

        this.disasterData.forEach((data) => {
          this.markers.push(
            {
              position: {
                lat: Number(data.Wgs84Y),
                lng: Number(data.Wgs84X),
              },
              title: data.CaseTime,
              location: data.CaseLocationDescription,
              classification: data.Name,
              infoActive: false,
            }
          );
        });
        console.log(this.markers);
      }).catch((error) => { console.log(error); });
    },
    mapReady() {
      var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(24.988143920898438,121.57535552978516)
      };
      var map = new google.maps.Map(document.getElementById("map"), myOptions);
      var dataPoint = {lat: 24.9881439, lng: 121.57535552978516};
      var marker = new google.maps.Marker({
        position: dataPoint,
        map: map,
        title: "路樹災情",
      });
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
