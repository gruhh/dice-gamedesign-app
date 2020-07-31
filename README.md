# dice.gamedesign.app

This project is a simple dice rolling web app for gameplay when you don't have any dice around.

It also has some tools for game designers.

Being an RNG created for simplicity, understand that the data is **not statistically perfect** and should be used only for fun.


## How to Use?

Just [access the live version](https://dice.gamedesign.app), select a die and click to roll.

If you need a custom dice use the expressions.

### The expressions:

You can create custom expressions clicking the "..." button.

- To roll a number: `Dn`
- To roll a group separate with commas: `Dn,Dn`
- To sum a group: `Dn+Dn`
- To create a custom dice: `D(x1;x2)`

_Examples:_

- D(heads;tails)
- D(🍉;🍋;🍌;🍍;🍎;🍓)
- D(10;15;20;30;50)
- D(2;4;6), D2
- D4
- D5
- D6
- D10
- D20
- D100
- D6, D6+D6
- D6, D12, D20

## For Game Designers

### Direct Links
You can provide links to your players using any valid [expression](#the-expressions):

https://dice.gamedesign.app/roll/EXPRESSION

_Examples:_ 

- Roll a D20: https://dice.gamedesign.app/roll/D20
- Roll a D6+D6: https://dice.gamedesign.app/roll/D6+D6
- Roll a D10 and a D6+D6: https://dice.gamedesign.app/roll/D10,D6+D6
- Roll a Coin: https://dice.gamedesign.app/roll/D(heads;tails)
- Roll from Emoji List: https://dice.gamedesign.app/roll/D(⛵;🚄;🚚;🚗;🚲;🛫)

---

####Made with:
- Vue.js
- Bulma.io
- Plausible.io as use analytics