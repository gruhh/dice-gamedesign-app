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
      <li v-show="!replayMode">
        <a class="button is-small" :class="customButtonActive" @click="open">{{ showCustom ? 'x' : '...' }}</a>
        <a class="button is-small ml-2" href="https://github.com/gruhh/dice-gamedesign-app#the-expressions" target="_blank" v-show="showCustom" :class="(themed) ? 'is-black' : 'is-info'">HELP</a>
      </li>
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Controls",
    props: {
      expression: String,
      replayMode: Boolean,
      themed: Boolean
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
        if (this.showCustom && !this.themed) {
          return 'is-light has-background-grey-lighter is-selected';
        } else if (this.showCustom && this.themed) {
          return 'is-dark has-background-black-bis is-selected';
        } else if (!this.showCustom && this.themed) {
          return 'is-dark has-background-black-bis is-selected';
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