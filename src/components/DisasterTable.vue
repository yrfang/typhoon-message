<template lang="pug">
.DisasterTable
  select.form-control(id="area-select",
         placeholder="請選擇行政區",
         v-model="selectedArea")
    option(v-for="area in areasName") {{ area.value }}
  br
  table.table
    thead
      tr
        th(v-for="heading in headingsRow")
          | {{ changeRowName(heading) }}
        th
    tbody(v-for="(data,id) in dataFilterByArea")
      tr.main(@click="toggleRow(data)",
         :class="{opened:opened.includes(data)}")
        td(v-for="heading in headingsRow")
          | {{ data[heading] }}
        td#arrow.fa.fa-chevron-right(v-model="toggleSeen")
      tr.subDescription(v-if="opened.includes(data)")
        td(colspan="5")
          ul
            li
              span.sub 災情細項類別
              span ： {{ data.Name }}
            li
              span.sub 災情描述
              span ： {{ data.CaseDescription }}
            li
              span.sub 災情通報單位
              span ： {{ data.CaseCommunicatorUnit }}
            li
              span.sub 是否已經處理完畢
              span ： {{ CaseIfComplete(data.CaseComplete) }}
</template>

<script>
export default {
  name: 'disasterTable',
  props: ['dataRow', 'headingsRow', 'areasName', 'id'],
  data() {
    return {
      selectedArea: '全部',
      toggleSeen: false,
      opened: [],
      subDescription: ["Name", "CaseDescription", "CaseCommunicatorUnit", "CaseComplete"],
    }
  },
  computed: {
    dataFilterByArea() {
      const vobj = this;
      // const dataFilter = vobj.dataRow;
      const selectedArea = vobj.selectedArea;
      return vobj.dataRow.filter((data) => {
        if (selectedArea == '全部') return data;

        if (data.CaseLocationDistrict.indexOf(selectedArea) > -1) return vobj.dataRow;
      });
    },
  },
  methods: {
    changeRowName(key) {
      if ( key == 'CaseTime') return key='日期時間';
      if ( key == 'CaseLocationDistrict') return key='區域名稱';
      if ( key == 'CaseLocationDescription') return key='詳細地點';
      if ( key == 'PName') return key='災情分類';
    },
    toggleRow(item) {
      // this.toggleSeen = !this.toggleSeen;
      const index = this.opened.indexOf(item);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(item);
      }

      // const arrow = document.getElementById('arrow');
      // if (arrow.classList.contains('fa-chevron-right')) {
      //   arrow.classList.remove('fa-chevron-right');
      //   arrow.classList.add('fa-chevron-down');
      // } else {
      //   arrow.classList.add('fa-chevron-right');
      //   arrow.classList.remove('fa-chevron-down')
      // }
    },
    CaseIfComplete(result) {
      if (result == 'true') {
        return result='是';
      } else {
        return result='否';
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
    background-color: rgba(#ddd, 0.5)

  tbody tr.main
    &:hover
      cursor: pointer
      background-color: rgba(#ffce85, 0.2)
      color: #000
      .fa.fa-chevron-right
        color: #333

  .fa.fa-chevron-right
    color: #aaa

.opened
  background-color: rgba(#ffce85, 0.2)
  color: #000

.subDescription
  background-color: rgba(#eee, 0.2)
  ul
    margin: 0px
    padding: 0px
    li
      list-style: none
      font-size: 16px
      padding: 10px
      .sub
        text-decoration: underline
        font-weight: 600
</style>
