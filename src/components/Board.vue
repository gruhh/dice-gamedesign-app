<template>
  <div class="roller">
    <span class="die" v-show="!isRolling" v-for="result in results" :key="result._id">{{ result }}</span>
    <span class="die" v-show="!isRolling" v-if="results.length === 0">click</span>
    <span class="die" v-show="isRolling"><button class="button mt-4 is-large is-loading" :class="themed ? 'is-dark' : 'is-white' ">Loading</button></span>
  </div>
</template>

<script>
  export default {
    props: {
      results: Array,
      isRolling: Boolean,
      themed: Boolean
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