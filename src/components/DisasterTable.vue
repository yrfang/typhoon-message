<template lang="pug">
.DisasterTable.outerContainer
  select.form-control(v-model="pagination.pageCount")
    option(v-for="length in pageLength",
           v-bind:value="length.value") {{length.text}}
  h5 current page: {{ pagination.currentPage }}
  h5 how many data counts: {{ pagination.pageCount }}
  h5 totalpage: {{ totalPage }}
  br
  nav.paginationBar
    ul
      li(v-for="page in buildPagination",
         @click="selectPage(page)",)
        .button {{ page }}
  hr
  table.table
    thead
      tr
        th(v-for="heading in headings")
          | {{ changeRowName(heading) }}
        th
    tbody(v-for="(data,id) in buildPage")
      tr.main(@click="toggleRow(data)",
              :class="{ opened:opened.includes(data) }")
        td(v-for="heading in headings")
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
  props: ['headings', 'dataFilterByArea'],
  data() {
    return {
      opened: [],
      toggleSeen: false,
      pageLength: [
        { text: "20 筆/頁", value: 20},
        { text: "30 筆/頁", value: 30},
        { text: "50 筆/頁", value: 50},
        { text: "100 筆/頁", value: 100},
      ],
      pagination: {
        range: 5,
        currentPage: 1,
        pageCount: 20,
        sliceTotalPage: [],
      },
    }
  },
  mounted() {
    this.selectPage(1);
  },
  computed: {
    totalPage() {
      return Math.ceil(this.dataFilterByArea.length/this.pagination.pageCount);
    },
    buildPagination() {
      let start=0;
      let end=0;
      var currentPage = this.pagination.currentPage;
      const range = this.pagination.range;
      const totalPage = this.totalPage;
      if (currentPage < range-2) {
        start = 1;
        end = start + range - 1;
      } else if ((currentPage <= totalPage) && (currentPage > totalPage-range+2)) {
        start = totalPage - range + 1;
        end = totalPage;
      } else {
        start = this.pagination.currentPage - 2;
        end = this.pagination.currentPage + 2;
      }

      if (start < 1) start = 1;
      if (end > totalPage) end = totalPage;

      this.pagination.sliceTotalPage = [];
      for (var i=start; i<=end; i++) {
        this.pagination.sliceTotalPage.push(i);
      }
      return this.pagination.sliceTotalPage;
    },
    buildPage() {
      if (this.pagination.currentPage > this.totalPage) {
        console.log("no more data!");
        this.pagination.currentPage = 1;
      }

      var dataStart = (this.pagination.currentPage-1) * this.pagination.pageCount;
      var dataEnd = (this.pagination.currentPage) * this.pagination.pageCount;
      return this.dataFilterByArea.slice(dataStart, dataEnd);
    }
  },
  methods: {
    changeRowName(key) {
      if ( key == 'CaseTime') return key='日期時間';
      if ( key == 'CaseLocationDistrict') return key='區域名稱';
      if ( key == 'CaseLocationDescription') return key='詳細地點';
      if ( key == 'PName') return key='災情分類';
    },
    toggleRow(item) {
      const index = this.opened.indexOf(item);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(item);
      }
    },
    CaseIfComplete(result) {
      if (result == 'true') {
        return result='是';
      } else {
        return result='否';
      }
    },
    selectPage(page) {
      this.pagination.currentPage = page;
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
