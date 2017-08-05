<template>
  <div id="app">
    <div id="topBar" class="row">
      <a class="col-xs-12.title.active">台北市颱風災情最新動態</a>
      <a class="col-xs-12.title">停電地區</a>
      <a href="https://taipeicity.github.io/eoc_119/" target="_blank" class="col-xs-12.subtitle">資料來源：台北市</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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

#topBar.title {
  text-align: left;
  padding-right: 30px;
  cursor: pointer;
}

.active {
  border-bottom: solid 5px yellow;
}
</style>
