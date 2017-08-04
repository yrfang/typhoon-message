<template>
  <div id="app">
    <div id="topBar" class="row">
      <h5 class="col-xs-12.title">台北市颱風災情最新動態</h5>
      <span class="col-xs-12.subtitle"><a href="https://taipeicity.github.io/eoc_119/" target="_blank">資料來源：台北市</a></span>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  padding: 20px
}

#topBar {
  padding: 10px
}

h5 {
  text-align: left;
  margin-right: 30px;
}
</style>
