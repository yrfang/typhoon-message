<template lang="pug">
.DisasterTable
  table.table
    thead
      tr
        th 區域名稱
    tbody
      tr(v-for="area in areas")
        td {{ area.value }}
</template>

<script>
export default {
  data() {
    return {
      
    };
  },

}
</script>

<style lang="sass">
.table
  text-align: left
  width: 80%
  margin-left: auto
  margin-right: auto
</style>
