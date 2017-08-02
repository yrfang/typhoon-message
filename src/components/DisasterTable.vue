<template lang="pug">
.DisasterTable.outerContainer
  select.form-control(id="area-select",
         placeholder="請選擇行政區",
         v-model="selectedArea")
    option(v-for="area in areasName") {{ area.value }}
  br
  select.form-control(v-model="pageCount")
    option(v-for="page in pageLength", v-bind:value="page.value") {{page.value}} 筆/頁
  h5 {{ pageCount }}
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
// const Paginate = require('vuejs-paginate');

export default {
  name: 'disasterTable',
  props: ['dataRow', 'headingsRow', 'areasName', 'id'],
  data() {
    return {
      selectedArea: '全部',
      toggleSeen: false,
      opened: [],
      subDescription: ["Name", "CaseDescription", "CaseCommunicatorUnit", "CaseComplete"],
      pageIndex: 0,
      pageCount: 10,
      pageLength: [
        { text: "10", value: 10 },
        { text: "20 筆/頁", value: 20 },
        { text: "50 筆/頁", value: 50 },
        { text: "100 筆/頁", value: 100 },
      ],
      minPageIndex: 0,
      maxPageIndex: 10,
    }
  },
  computed: {
    dataFilterByArea() {
      const selectedArea = this.selectedArea;
      return this.dataRow.filter((data) => {
        if (selectedArea == '全部') return data;

        if (data.CaseLocationDistrict.indexOf(selectedArea) > -1) return this.dataRow;
      });
    },
    dataBySliceByPage() {
      if (this.pageIndex >= this.totalPage) {
        // console.log("no more data!");
        this.pageIndex = 0;
      }
      var start = this.pageIndex * this.pageCount;
      var end = (this.pageIndex+1) * this.pageCount;
      return this.dataFilterByArea.slice(start, end);
    },
    totalPage() {
      var totalData = this.dataFilterByArea.length;
      var pageCount = this.pageCount;
      var pages = Math.ceil(totalData/pageCount);
      if (pages <= 10) return pages;
      // if (pages > 10) return pages=10;
      return pages;
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
    pageClick(page) {
      return this.pageIndex = page-1;
    },
    paginate(num) {
      if (num == 1) {
        if (this.pageIndex >= (this.totalPage-1)) {
          return this.pageIndex = this.totalPage-1;
        } else {
          this.pageIndex++
        }
      }

      if (num == -1) {
        if (this.pageIndex <= 0) {
          return this.pageIndex = 0;
        } else {
          this.pageIndex--;
        }
      }
    },
    chageDisplayPage(pageId) {
      var templateId = [];
      var dataTotalBySlicePage = this.dataBySlicePage;
      var min = this.minPageIndex;
      var max = this.maxPageIndex;
      templateId = dataTotalBySlicePage.slice(this.data)
    },
  }
}
</script>

<style lang="sass">
.outerContainer
  width: 100%

.pageContainer
  max-width: 800px
  // li
  //   display: inline-block

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
