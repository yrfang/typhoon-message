<template lang="pug">
.DisasterTable
  table.table
    thead
      tr
        th(v-for="heading in headingsRow")
          | {{ changeRowName(heading) }}
    tbody
      tr(v-for="data in dataRow")
        td(v-for="heading in headingsRow")
          | {{ data[heading] }}
</template>

<script>
export default {
  name: 'disasterTable',
  props: ['dataRow', 'headingsRow'],
  methods: {
    changeRowName(key) {
      if ( key == 'CaseTime') return key='日期時間';
      if ( key == 'CaseLocationDistrict') return key='區域名稱';
      if ( key == 'CaseLocationDescription') return key='詳細地點';
      if ( key == 'CaseDescription') return key='事故描述';
    }
  }
}
</script>

<style lang="sass">
table
  text-align: left

  thead tr th
    &:nth-child(1)
      width: 20%
    &:nth-child(2)
      width: 15%
    &:nth-child(3)
      width: 200px
    &:nth-child(4)
      width: 30%

  .table th, .table td
    padding-right: 20px

</style>
