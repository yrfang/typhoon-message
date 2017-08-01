<template lang="pug">
.DisasterTable
  select.form-control(id="area-select",
         placeholder="請選擇行政區",
         v-model="selectedArea")
    option(v-for="area in areasTable") {{ area.value }}
  br
  table.table
    thead
      tr
        th(v-for="heading in headingsRow")
          | {{ changeRowName(heading) }}
        th
    tbody(v-for="(data,id) in dataRow")
      tr(@click="toggleRow(data)",
         :class="{opened:opened.includes(data)}")
        td(v-for="heading in headingsRow")
          | {{ data[heading] }}
        td.fa.fa-chevron-right
      tr(v-if="opened.includes(data)")
        td(colspan="5") ON!
</template>

<script>
export default {
  name: 'disasterTable',
  props: ['dataRow', 'headingsRow', 'areasTable', 'id'],
  data() {
    return {
      selectedArea: '全部',
      toggleSeen: false,
      opened: [],
    }
  },
  methods: {
    changeRowName(key) {
      if ( key == 'CaseTime') return key='日期時間';
      if ( key == 'CaseLocationDistrict') return key='區域名稱';
      if ( key == 'CaseLocationDescription') return key='詳細地點';
      if ( key == 'Name') return key='災害種類';
    },
    toggleRow(item) {
      // this.toggleSeen = !this.toggleSeen;
      const index = this.opened.indexOf(item);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(item);
      }
    },
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
      width: 45%
    &:nth-child(4)
      width: 20%

  .table th, .table td
    padding-right: 20px

  thead tr
    background-color: rgba(#ddd, 0.3)

  tbody tr
    &:hover
      cursor: pointer
      background-color: rgba(#ddd, 0.3)
      color: #000
      .fa.fa-chevron-right
        color: #333

  .fa.fa-chevron-right
    color: #aaa

.opened
  background-color: #ffce85
  // tbody tr
  //   &:hover
  //     background-color: transparent



</style>
