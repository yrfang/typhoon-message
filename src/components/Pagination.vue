<template lang="pug">
.Pagination
  .row
    nav.paginationBar.col-xs-12
      ul
        li(@click="selectPage(1)",
           :class="{'is-disable':pagination.currentPage==1}")
          .button
            i.fa.fa-angle-double-left
        li(@click="selectPage(pagination.currentPage-1)",
           :class="{'is-disable':pagination.currentPage==1}")
          .button
            i.fa.fa-angle-left
        li(v-for="page in buildPagination",
           @click="selectPage(page)",
           :class="{'is-info':page==pagination.currentPage}")
          .button {{ page }}
        li(@click="selectPage(pagination.currentPage+1)",
           :class="{'is-disable':pagination.currentPage==totalPage}")
          .button
            i.fa.fa-angle-right
        li(@click="selectPage(totalPage)",
           :class="{'is-disable':pagination.currentPage==totalPage}")
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
.Pagination
  padding-left: 20px
  padding-right: 20px

.paginationBar
  ul
    margin: 0px
    padding: 0px

    li
      list-style: none
      display: inline-block
      border: solid 1px rgba(#999,0.5)
      border-radius: 5px
      text-align: center
      cursor: pointer
      margin-right: 5px

      .button
        width: 40px
        height: 40px
        padding-top: 8px
        padding-bottom: 8px
        text-align: center
        font-size: 16px
        font-weight: 900

.is-info
  background-color: #4074fa
  color: #fff
  font-weight: lighter

.is-disable
  color: rgba(#777,0.2)
</style>
