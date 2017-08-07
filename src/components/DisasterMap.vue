<template lang="pug">
.DisasterMap
  .row.bar
    .alert.alert-info.col-xs-12
      p 如有供電問題，請撥打台電客服1911。1040808
      p 目前停電處尚未： {{ powerInfo.length }} 處
  .row.bar
    select.selectedArea(v-model="selectedArea")
      option(v-for="area in areas") {{ area }}
  br
  .row.bar
    .alert.alert-success.col-xs-12
      p#time 時間：
      p#location 地點：
      p#description 災情描述：
  #map
//- <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
</template>

<script>
import axios from 'axios';

const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  data() {
    return {
      areas: ['全部','萬華區','中正區','大同區','中山區','大安區','南港區','文山區','松山區','信義區','士林區','北投區','內湖區'],
      selectedArea: '全部',
      infos: [],
      coordinates: [],
    }
  },
  mounted() {
    this.getPowerData();
    // this.mapTest(); //大安區測試
  },
  computed: {
    powerInfo() {
      const selectedArea = this.selectedArea;
      return this.infos.filter((data) => {
        if (data.state == 'true') {
          if (selectedArea == '全部') return data;
        }
        if (data.district.indexOf(selectedArea) > -1) return this.infos;
      });
    },
  },
  methods: {
    getPowerData() {
      axios.get(DisasterApiUrl).then((response) => {
        const disasterData = response.data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;

        //infos list
        disasterData.filter((data) => {
          if (data.Name.indexOf('電力停電') > -1) return data;
        }).forEach((data) => {
          this.infos.push(
            {
              time: data.CaseTime,
              district: data.CaseLocationDistrict,
              location: data.CaseLocationDescription,
              description: data.CaseDescription,
              classification: data.Name,
              state: data.CaseComplete,
              infoActive: false,
            }
          );
        });
        console.log(this.infos);

        //coordinates list
        disasterData.filter((data) => {
          if (data.Name.indexOf('電力停電') > -1) return data;
        }).forEach((data) => {
          this.coordinates.push(
            {
              position: {
                lat: Number(data.Wgs84Y),
                lng: Number(data.Wgs84X),
              },
            }
          );
        });
        console.log(this.coordinates);

      }).catch((error) => { console.log(error); });
    },
    mapReady() {
      var myOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(25.0533102,121.542379)
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
  width: 100%
  overflow-x: hidden
  overflow-y: scroll
  padding-left: 20px
  padding-right: 20px

.alert-info, .alert-success
  width: 100%
.alert-info > p
  text-align: left
  margin: 5px
.alert-success > p
  text-align: left
  margin: 5px

select.selectedArea
  height: 40px
  padding: 5px
  border: solid 1px #aaa
  width: 300px

#map
  border: solid 1px #000
  width: calc(100% - 50px)
  height: 550px
  margin: 10px 30px
</style>
