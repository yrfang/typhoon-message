<template lang="pug">
.Pagination
  select.form-control(v-model="pagination.pageCount")
    option(v-for="length in pageLength",
           v-bind:value="length.value") {{length.text}}
  br
  nav.paginationBar
    ul
      li(v-for="page in buildPagination",
         @click="selectPage(page)",)
        .button {{ page }}
</template>

<script>
export default {
  name: 'pagination',
  props: ['dataFilterByArea', 'pageLength', 'pagination', 'totalPage'],
  data() {
    return {

    }
  },
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
      this.pagination.currentPage = page;
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
