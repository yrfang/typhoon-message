<template lang="pug">
.Pagination
  select.form-control(v-model="pagination.pageCount")
    option(v-for="length in pageLength",
           v-bind:value="length.value") {{length.text}}
  h5 current page: {{ pagination.currentPage }}
  h5 how many data counts: {{ pagination.pageCount }}
  br
  nav.paginationBar
    ul
      li(v-for="page in pagination.sliceTotalPage",
         @click="selectPage(page)",)
        .button {{ page }}
</template>

<script>
export default {
  name: 'pagination',
  props: ['dataFilterByArea'],
  data() {
    return {
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
    // buildPage();
  },
  computed: {
    totalPage() {
      return Math.ceil(this.dataFilterByArea.length/this.pageCount);
    },
  },
  methods: {
    selectPage(page) {
      this.pagination.currentPage = page;
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
      console.log(this.pagination.sliceTotalPage);
      // var dataStart = (this.pagination.currentPage-1) * this.pageCount;
      // var dataEnd = (this.pagination.currentPage) * this.pageCount;
      // this.dataFilterByArea.slice(dataStart, dataEnd);
    },
    buildPage() {
      var dataStart = (this.pagination.currentPage-1) * this.pagination.pageCount;
      var dataEnd = (this.pagination.currentPage) * this.pagination.pageCount;
      this.dataFilterByArea.slice(dataStart, dataEnd);
      console.log(this.dataFilterByArea);
    },
  },
}
</script>

<style lang="sass">
.paginationBar
  ul
    margin: 0px
    padding: 0px
    li
      list-style: none
      display: inline-block
      border: solid 1px #777
      text-align: center
      cursor: pointer
      .button
        width: 45px
        height: initial
        padding: 8px
        margin-left: auto
        margin-right: auto
</style>
