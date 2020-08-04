<template>
  <div class="roller">
    <span class="die" v-for="result in results" :key="result._id">{{ result }}</span>
    <span class="die" v-if="results.length === 0">click</span>
  </div>
</template>

<script>
  export default {
    props: {
      results: Array
    }
  }
</script>

<style scoped>
  .roller {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .die {
    margin: 10px;
    font-size: 3.5rem;
    font-weight: bolder;
  }
</style>