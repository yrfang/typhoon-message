<template lang="pug">
.Pagination
  select.form-control(v-model="pagination.pageCount")
    option(v-for="length in pageLength",
           v-bind:value="length.value") {{length.text}}
  h5 currentPage: {{ pagination.currentPage }}
  br
  nav.paginationBar
    ul
      li(@click="selectPage(1)")
        .button
          i.fa.fa-angle-double-left
      li(@click="selectPage(pagination.currentPage-1)")
        .button
          i.fa.fa-angle-left
      li(v-for="page in buildPagination",
         @click="selectPage(page)",)
        .button {{ page }}
      li(@click="selectPage(pagination.currentPage+1)")
        .button
          i.fa.fa-angle-right
      li(@click="selectPage(totalPage)")
        .button
          i.fa.fa-angle-double-right
</template>

<script>
export default {
  name: 'pagination',
  props: ['dataFilterByArea', 'pageLength', 'pagination', 'totalPage'],
  mounted() {
    this.selectPage(1);
  },
  computed: {
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
  },
  methods: {
    selectPage(page) {
      // console.log(page);
      this.pagination.currentPage = page;

      if (this.pagination.currentPage == 0) {
        this.pagination.currentPage = 1;
      }
      if (this.pagination.currentPage > this.totalPage) {
        this.pagination.currentPage = this.totalPage;
      }
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
      border-radius: 5px
      text-align: center
      cursor: pointer
      margin-right: 5px
      box-shadow: 0px 0px 5px rgba(#333, 0.1)

      .button
        width: 45px
        height: 45px
        padding: 10px
        font-size: 16px
        text-algin: center
</style>
