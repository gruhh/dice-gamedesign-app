<template>
  <div class="notification is-warning has-text-centered" v-show="show">
    <button class="delete" @click="show = !show"></button>
    Being an RNG created for simplicity, understand that this data is <b>not statistically perfect</b> and should be used only for fun.
  </div>
</template>

<script>
  export default {
    name: "StartAlert",
    data() {
      return {
        show: true
      }
    }
  }
</script>
