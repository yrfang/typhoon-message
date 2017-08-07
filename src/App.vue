<template lang="pug">
#app
  #topBar.row
    a.col-xs-6.title(@click="routeToData", v-bind:class="{'active':this.$route.path == '/'}") 台北市颱風災情最新動態
    a.col-xs-6.title(@click="routeToMap", v-bind:class="{'active':this.$route.path == '/map'}") 停電地區
    a.col-xs-12.subtitle(href="https://taipeicity.github.io/eoc_119/" target="_blank") 資料來源：台北市
  router-view
</template>

<script>
export default {
  name: 'app',
  methods: {
    routeToData() {
      this.$router.push('/');
    },
    routeToMap() {
      this.$router.push('map');
    },
  }
}
</script>

<style>
* {
  position: relative;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px
}

#topBar {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100vw;
  margin-bottom: 10px;
  padding: 20px 30px 15px 30px;
  background-color: #eee;
  vertical-align: center;
}

a.title {
  text-align: left;
  margin-right: 30px;
  cursor: pointer;
  text-decoration: none;
}

.active {
  border-bottom: solid 5px #ffce85;
}
</style>
