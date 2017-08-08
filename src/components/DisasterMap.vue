<template lang="pug">
.DisasterMap
  .row.bar
    .alert.alert-info.col-xs-12
      p 如有供電問題，請撥打台電客服1911。1040808
  .row.bar
    select.selectedArea(v-model="selectedArea", @change="mappingDataByArea(selectedArea)")
      option(v-for="area in areas") {{ area }}
  br
  .row.bar
    .alert.alert-success.col-xs-12
      p 目前停電處尚有： {{ filteredByArea.length }} 處
      p#timeBar(v-show="filteredByArea.length>0")
      p#locationBar(v-show="filteredByArea.length>0")
      p#descriptionBar(v-show="filteredByArea.length>0")
  #map
</template>

<script>
import axios from 'axios';

const DisasterApiUrl = "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json";

export default {
  data() {
    return {
      areas: ['全部','萬華區','中正區','大同區','中山區','大安區','南港區','文山區','松山區','信義區','士林區','北投區','內湖區'],
      selectedArea: '全部',
      powerData: [],
      filterData: [],
      infos: [],
    }
  },
  mounted() {
    this.getPowerData();
  },
  computed: {
    filteredByArea() {
      const selectedArea = this.selectedArea;
      return this.powerData.filter((data) => {
        if (selectedArea == '全部') return data;
        if (data.CaseLocationDistrict.indexOf(selectedArea) > -1) return this.powerData;
      });
    },
  },
  methods: {
    getPowerData() {
      const timeBar = document.getElementById('timeBar');
      const locationBar = document.getElementById('locationBar');
      const descriptionBar = document.getElementById('descriptionBar');

      axios.get(DisasterApiUrl).then((response) => {
        const disasterData = response.data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        const selectedArea = this.selectedArea;

        this.powerData = [];

        disasterData.filter((data) => {
          if (data.Name.indexOf('電力停電') > -1) return data;
        }).forEach((data) => {
          if (data.CaseComplete == 'true')
          this.powerData.push(data);
        });
        console.log(this.powerData);

        const bounds = new google.maps.LatLngBounds;

        const mapElement = document.getElementById('map');
        const dataOptions = {
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        const map = new google.maps.Map(mapElement, dataOptions);

        this.powerData.forEach((coord) => {
          const lat = coord.Wgs84Y;
          const lng = coord.Wgs84X;
          const time = coord.CaseTime;
          const location = coord.CaseLocationDescription;
          const description = coord.CaseDescription;

          const position = new google.maps.LatLng(lat, lng);
          const marker = new google.maps.Marker({
            position,
            map
          });

          marker.addListener('click', function(item) {
            console.log('hi');
            console.log(time, location, description);
            timeBar.innerHTML = '時間: ' + time;
            locationBar.innerHTML = '地點: ' + location;
            descriptionBar.innerHTML = '描述: ' + description;
          });
          map.fitBounds(bounds.extend(position));
        });
      }).catch((error) => { console.log(error); });

    },
    mappingDataByArea(area) {
      const timeBar = document.getElementById('timeBar');
      const locationBar = document.getElementById('locationBar');
      const descriptionBar = document.getElementById('descriptionBar');

      timeBar.innerHTML = '';
      locationBar.innerHTML = '';
      descriptionBar.innerHTML = '';

      this.filterData = [];
      this.powerData.filter((data) => {
        if (area == '全部') this.filterData = this.powerData;
        if (data.CaseLocationDistrict.indexOf(area) > -1) {
          this.filterData.push(data);
        }
      });
      console.log(this.filterData);

      const bounds = new google.maps.LatLngBounds;

      const mapElement = document.getElementById('map');
      const dataOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      const map = new google.maps.Map(mapElement, dataOptions);

      this.filterData.forEach((coord) => {
        const lat = coord.Wgs84Y; //緯度
        const lng = coord.Wgs84X; //精度
        const time = coord.CaseTime;
        const location = coord.CaseLocationDescription;
        const description = coord.CaseDescription;

        const position = new google.maps.LatLng(lat, lng);
        const marker = new google.maps.Marker({
          position,
          map
        });
        marker.addListener('click', function() {
          console.log('hi~for each distriction');
          timeBar.innerHTML = '時間: ' + time;
          locationBar.innerHTML = '地點: ' + location;
          descriptionBar.innerHTML = '描述: ' + description;
        });
        map.fitBounds(bounds.extend(position));
      });

      if (this.filterData.length == 0) {
        console.log('No case without power!');
        this.withoutOffPowerData();
      }
    },
    withoutOffPowerData() {
      const mapElement = document.getElementById('map');
      const dataOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(25.0533102,121.542379)
      };
      const map = new google.maps.Map(mapElement, dataOptions);
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
