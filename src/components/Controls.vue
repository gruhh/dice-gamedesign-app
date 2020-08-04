<template>
  <div>
    <ul>
      <li v-show="!replayMode"><a class="button is-small mb-2" @click="setDice('D4')">D4</a></li>
      <li v-show="!replayMode"><a class="button is-small mb-2" @click="setDice('D6')">D6</a></li>
      <li v-show="!replayMode"><a class="button is-small mb-2" @click="setDice('D10')">D10</a></li>
      <li v-show="!replayMode"><a class="button is-small mb-2" @click="setDice('D12')">D12</a></li>
      <li v-show="!replayMode"><a class="button is-small mb-2" @click="setDice('D20')">D20</a></li>
      <li v-show="!replayMode"><a class="button is-small mb-2" @click="setDice('D6+D6')">D6+D6</a></li>
      <li v-show="!replayMode"><a class="button is-small mb-2" @click="setDice('D6,D6')">D6, D6</a></li>
      <li v-show="!replayMode"><a class="button is-small" :class="customButtonActive" @click="open">{{ showCustom ? 'x' : '...' }}</a></li>
      <li v-show="replayMode"><a class="button is-small" @click="$emit('quit', 'replay')">Quit Replay Mode</a></li>
    </ul>
    <div v-show="showCustom" class="field is-grouped mt-2">
      <div class="field has-addons">
        <p class="control input-limited">
          <input class="input" type="text" placeholder="Add a custom Dice Expression" v-model.lazy="customExpression">
        </p>
        <p class="control">
          <button class="button" @click="setExpression">Set and Roll</button>
        </p>
        <p class="control">
          <button class="button" @click="setExpression">Help</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Controls",
    props: {
      expression: String,
      replayMode: Boolean
    },
    data() {
      return {
        showCustom: false,
        customExpression: ''
      }
    },
    methods: {
      open() {
        if (this.expression) {
          this.customExpression = this.expression;
        }
        this.showCustom = !this.showCustom;
      },
      setDice(dice) {
        this.showCustom = false;
        this.$emit('setDice', dice);
      },
      setExpression() {
        if (this.customExpression) {
          this.setDice(this.customExpression);
          this.showCustom = false;
        }
      }
    },
    computed: {
      customButtonActive() {
        if (this.showCustom) {
          return 'is-light is-selected';
        }
        return false;
      }
    }
  }
</script>

<style scoped>
  .input-limited {
    max-width: 40vw;
  }
</style>