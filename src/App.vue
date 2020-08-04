<template>
  <div id="app">
    <Menu @reset="reset" @modal="generateModal" :history="history.length > 0" :replay-mode="hasHistoryLoaded"/>
    <div class="container workspace" @click.self="clickTheTable">
      <Board class="board" :results="results"/>
      <Controls class="controls-list pl-3 pb-3" @setDice="setAndRoll" @quit="quitMode" :expression="diceExpression" :replay-mode="hasHistoryLoaded"/>
      <History class="has-text-right history-list pr-3 pb-3" :list="history" :expression="diceExpression"/>
      <StartAlert/>
    </div>
    <ModalUI :loadModal="loadModal" @unload="unloadModal" />
  </div>
</template>

<script>
  import Menu from "@/components/Menu";
  import Board from "@/components/Board";
  import Controls from "@/components/Controls";
  import History from "@/components/History";
  import StartAlert from "@/components/StartAlert";
  import ModalUI from "@/ModalUI";

  export default {
    name: 'App',
    components: {
      ModalUI,
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
        diceVariables:[],
        results:[],
        history:[],
        loadedHistory:'',
        historyIndex:0,
        loadModal:''
      }
    },
    created() {
      this.diceExpression = (this.$route.params.expression) ? this.$route.params.expression : 'D6';
      this.loadedHistory = (this.$route.params.history) ? this.loadHistory(this.$route.params.history) : '';
    },
    computed: {
      hasHistoryLoaded() {
        return this.loadedHistory.length > 0;
      }
    },
    methods: {
      clickTheTable() {
        if (this.hasHistoryLoaded) {
          this.replay();
          return;
        }
        this.roll();
      },
      setAndRoll(expression) {
        this.diceExpression = expression.toString().replace(/,+$/, '');
        this.roll();
      },
      replay() {
        if (this.historyIndex === this.loadedHistory.length) {
          this.clearTheResults();
          this.addToResults('end');
          this.addToHistory('end');
          this.historyIndex++;
          return;
        } else if (this.historyIndex >= this.loadedHistory.length) {
          return;
        }

        this.clearTheResults();

        this.addToResults(this.loadedHistory[this.historyIndex]);
        this.addToHistory(this.loadedHistory[this.historyIndex]);

        this.historyIndex++;
      },
      roll() {
        // Clear the results
        this.clearTheResults();

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

            dice = this.cleanExpression(dice, 'D');

            let customDice;
            let diceSize;

            customDice = dice.toString().split(';');
            diceSize = customDice.length;

            this.addToResults(customDice[this.generate(diceSize)-1]);

          } else if (dice.toString().startsWith('D')) {
            this.addToResults(this.generate(this.diceToSize(dice)));
          } else if (dice.toString().startsWith('I(')) {
            let values = this.cleanExpression(dice, 'I').split(';');

            if (this.diceVariables.some(variable => variable.name === `I${values[0]}${values[1]}`)) {
              // Update variable value
              this.diceVariables
                .filter(variable => variable.name === `I${values[0]}${values[1]}`)
                .forEach(variable => {
                  variable.value = this.sumValues(variable.value, values[0]);

                  this.addToResults(variable.value);
                });
            } else {
              // Create a new variable holder
              this.diceVariables.push({
                name: `I${values[0]}${values[1]}`,
                value: this.sumValues(values[1], values[0])
              });

              this.addToResults(this.sumValues(values[1], values[0]));
            }
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
      clearTheResults() {
        this.results = [];
      },
      cleanExpression(dice, suffix) {
        return dice.toString()
            .replace(suffix+'(', '').trim()
            .replace(')', '').trim();
      },
      sumValues() {
        let values = Array.from(arguments);
        let sum = 0;
        for (let i = 0; i < values.length; i++) {
          sum += parseInt(values[i]);
        }
        return sum;
      },
      reset() {
        this.results = [];
        this.history = [];
        this.diceVariables = [];
        this.historyIndex = 0;
      },
      generateModal(type) {
        let link = 'https://dice.gamedesign.app/';

        if (type === 'dice') {
          link += 'roll/'+this.diceExpression;
          this.loadModal = {
            title: 'Dice Link',
            content: 'This link is a way to share the current dice with anyone.',
            link: link
          }
        }

        if (type === 'history') {
          // btoa is used to hide a little the history list
          link += 'replay/' + btoa(encodeURIComponent(JSON.stringify(this.history)));
          this.loadModal = {
            title: 'Replay Link',
            content: 'This link will load the <b>exactly same history in the same order</b><br>' +
                'So, you can share an awesome experience with friends to see their results with the same dice you roll.',
            link: link
          }
        }
      },
      unloadModal() {
        this.loadModal = '';
      },
      loadHistory(param) {
        this.diceExpression = 'Replay Mode';
        try {
          return JSON.parse(decodeURIComponent(atob(param)));
        } catch (e) {
          throw Error('ERROR: the history you tried to load was invalid.');
        }
      },
      quitMode(mode) {
        if (mode === 'replay') {
          this.loadedHistory = '';
          this.diceExpression = 'D6';
        }
        this.reset();
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
