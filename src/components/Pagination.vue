<template lang="pug">
.Pagination
  select.form-control(v-model="pageCount")
    option(v-for="length in pageLength",
           v-bind:value="length.value") {{length.text}}
  h5 {{ pageCount }}
  br
  nav.paginationBar
    ul
      li(v-for="page in totalPage")
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
      pageCount: 20,
      pagination: {
        range: 5,
        currentPage: 1,
        filterData: [],
        data: [],
      },
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.dataFilterByArea.length/this.pageCount);
    }
  }
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
