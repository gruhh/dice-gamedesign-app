# dice.gamedesign.app

This project is a simple dice rolling web app for gameplay when you don't have any dice around.

It also has some tools for game designers.

Being an RNG created for simplicity, understand that the data is **not statistically perfect** and should be used only for fun.

## How to Use?

Just [access the live version](https://dice.gamedesign.app), select a die and click to roll.

If you need a custom dice use the expressions.

### The expressions:

You can create custom expressions clicking the "..." button.

- **To roll a number**: `Dn` 
    - This will roll a random number between 1 and n.
    - The n can be negative, so the roll will be between -1 and -n.
- **To roll a group**: `Dn,Dn`
    - Multiple dices can be separated with commas, each die will roll a random number between 1 and n.
- **To sum a group:** `Dn+Dn`
    - Using a + sign will sum the random numbers between 1 and n.
    - You can't sum custom dice, because they are strings.
    - You can sum negative die.
- **To create custom dice:** `D(x1;x2;...xn)`
    - You can create sides with custom static values. The die will roll a random between 1 and n.
    - x is a _string_, so you can use words, chars, static numbers, emojis, html symbols.
- **To create an incrementation roll:** `I(n;x)`
   - This will roll a simple incrementation by n, starting at x.

_Cases:_
- If you need to roll 0s, create a custom die, like `D(0;1;2;3;4;5;6)`.

_Examples:_

Expression | Example of 5 rolls (separated by /)
------------ | -------------
D(heads;tails) | heads / heads / tails / heads / tails
D(🍉;🍋;🍌;🍍;🍎;🍓) | 🍉 / 🍉 / 🍍 / 🍎 / 🍓
D(🍉🍎🍓;🍋🍌;🍍) | 🍋🍌 / 🍍 / 🍋🍌 / 🍉🍎🍓 / 🍍
D(10;15;20;30;50) | 30 / 30 / 30 / 10 / 50
D(0;0;0;1;5;10) | 0 / 0 / 1 / 0 / 10 
D(2;4;6), D2 | 2, 1 / 6, 1 / 2, 1 / 4, 2 / 6, 2
D4 | 4 / 2 / 3 / 4 / 1
D-4 | -2 / -2 / -4 / -1 / -1
D5 | 3 / 1 / 5 / 1 / 2 
D6 | 1 / 4 / 3 / 6 / 6
D10 | 8 / 4 / 3 / 10 / 5
D20 | 1 / 8 / 1 / 20 / 18
D100 | 22 / 85 / 100 / 99 / 1
D6, D6+D6 | 2, 7 / 6, 5 / 3, 7 / 5, 11 / 1, 2
D-6+D6 | -1 / 4 / -2 / 0 / 5
D6, D12, D20 | 3, 11, 15 / 4, 1, 1 / 5, 2, 18 / 6, 1, 20 / 1, 1, 1
I(1;0) | 1 / 2 / 3 / 4 / 5 (...)
I(-1;6) | 5 / 4 / 3 / 2 / 1 (...)
I(2;0) | 2 / 4 / 6 / 8 / 10 (...)
I(2;1) | 3 / 5 / 7 / 9 / 11 (...)
I(1;0), D6 | 1, 3 / 2, 3 / 3, 1 / 4, 6 / 5, 1

The (...) symbol indicates a logical continuation.

## For Game Designers

- You may distribute the links freely.
- We don't collect any personal data from the users, we just have a simple privacy-friendly analytics service in the live version, read their [data policy](https://plausible.io/data-policy).

### Dice Links
You can provide links to your players using any valid [expression](#the-expressions):

https://dice.gamedesign.app/roll/EXPRESSION

To a better experience, you can create your dice in the live version and click the "Dice link" button.

_Examples:_ 

- Roll a D20: https://dice.gamedesign.app/roll/D20
- Roll a D6+D6: https://dice.gamedesign.app/roll/D6+D6
- Roll a D10 and a D6+D6: https://dice.gamedesign.app/roll/D10,D6+D6
- Roll a Coin: https://dice.gamedesign.app/roll/D(heads;tails)
- Roll from an Emoji list: https://dice.gamedesign.app/roll/D(⛵;🚄;🚚;🚗;🚲;🛫)

### Replay Link

Any history can be shared.

By clicking in the "Replay Link" you will generate a link to replay the **exactly same history in the same order**.

So the designer or the players can share an awesome experience with friends to see their results with that history.

### Custom Experience Link

Soon.

---

#### About

This was made because I needed this tool to design some games.

So I want to share with other game designers.

#### Made with

- Vue.js
- Bulma.io
- Plausible.io
