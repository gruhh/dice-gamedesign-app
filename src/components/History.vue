<template>
  <div>
    <ul class="has-text-grey-light">
      <li v-for="(item, index) of list" :key="item._id"><span v-if="list.length === index + 1">> </span><span>#{{ index+1 }}: </span>{{ item }}</li>
    </ul>
    <span class="tag is-light mt-2">{{ expression }}</span>
  </div>
</template>

<script>
  export default {
    name: "History",
    props: {
      list: Array,
      expression: String
    },
  }
</script>

<style scoped>
</style>