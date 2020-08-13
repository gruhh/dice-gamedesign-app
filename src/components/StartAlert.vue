<template>
  <div class="notification has-text-centered" :class="(themed) ? 'has-text-grey-light has-background-grey-dark' : 'is-warning'" v-show="show">
    <button class="delete" @click="show = !show"></button>
    Being an RNG created for simplicity, understand that this data is <b>not statistically perfect</b> and should be used only for fun.
  </div>
</template>

<script>
  export default {
    name: "StartAlert",
    props: {
      themed: Boolean
    },
    data() {
      return {
        show: true,
      }
    }
  }
</script>
