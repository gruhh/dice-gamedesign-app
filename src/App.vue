<template>
  <div id="app">
    <Menu @reset="reset"/>
    <div class="container workspace" @click.self="roll">
      <Board class="board" :results="results"/>
      <Controls class="controls-list pl-3 pb-3" @setDice="setAndRoll" :expression="diceExpression"/>
      <History class="has-text-right history-list pr-3 pb-3" :list="history" :expression="diceExpression"/>
      <StartAlert/>
    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu";
  import Board from "@/components/Board";
  import Controls from "@/components/Controls";
  import History from "@/components/History";
  import StartAlert from "@/components/StartAlert";

  export default {
    name: 'App',
    components: {
      Menu,
      Board,
      Controls,
      History,
      StartAlert
    },
    data() {
      return {
        diceExpression:'',
        dice:[],
        results:[],
        history:[],
        alertMessage:''
      }
    },
    created() {
      this.diceExpression = (this.$route.params.expression) ? this.$route.params.expression : 'D6';
    },
    methods: {
      setAndRoll(expression) {
        this.diceExpression = expression.toString().replace(/,+$/, '');
        this.roll();
      },
      roll() {
        // Clear the results
        this.results = [];

        // Clear the dice
        this.dice = [];

        // Get the command and split into the dice using commas
        this.dice = this.diceExpression.split(',').map((dice)=>dice.trim());

        // Resolve the dice expression
        this.dice.forEach(dice => {
          if (dice.toString().includes('+')) {
            let sumDice = 0;

            dice.toString()
              .split('+')
              .forEach(dice => {
                sumDice += this.generate(this.diceToSize(dice));
              });

            this.addToResults(sumDice);
          } else if (dice.toString().startsWith('D(')) {

            dice = dice.toString()
              .replace('D(', '').trim()
              .replace(')', '').trim();

            let customDice;
            let diceSize;

            customDice = dice.toString().split(';');
            diceSize = customDice.length;

            this.addToResults(customDice[this.generate(diceSize)-1]);

          } else if (dice.toString().startsWith('D')) {
            this.addToResults(this.generate(this.diceToSize(dice)));
          }
        });

        // Add the result to the history
        this.addToHistory(this.results.toString());
      },
      generate(size) {
        if (size < -1 || size > 1) {
          // TODO: Change the random algorithm
          return Math.floor((Math.random() * size) + 1);
        }

        return size;
      },
      diceToSize(dice) {
        // TODO: Check if the size is a number
        return dice.toString().replace('D', '');
      },
      addToResults(item) {
        this.results.push(item);
      },
      addToHistory(item) {
        if (item) {
          // Add the result to the list of History
          this.history.push(item);
        }
      },
      reset() {
        this.results = [];
        this.history = [];
      }
    }
  }
</script>

<style>
  *:not(input) {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  .workspace {
    height: calc(100vh - 58px);
    overflow: hidden;
  }
  .workspace .board {
    z-index: -10;
  }
  .controls-list {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .history-list {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -100;
  }
</style>
