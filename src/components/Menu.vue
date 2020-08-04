<template>
  <div>
    <nav aria-label="main navigation" class="navbar is-black" role="navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://gamedesign.app" target="_blank">
            <p class="is-lowercase has-text-weight-bold ml-0">dice.gamedesign.app</p>
          </a>

          <a role="button" class="navbar-burger burger" :class="navbarIsActive" aria-label="menu" aria-expanded="false" @click="openMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" :class="navbarIsActive">
          <div class="navbar-start">
            <a class="navbar-item" href="https://github.com/gruhh/dice-gamedesign-app" target="_blank">Open Source</a>
            <a class="navbar-item" href="https://github.com/gruhh/dice-gamedesign-app#for-game-designers" target="_blank">For Game Designers</a>
            <a class="navbar-item" href="https://gruhh.com" target="_blank">Made By</a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-dark is-small" @click="(history) ? $emit('modal', 'history') : null" :disabled="!history">Replay Link</a>
                <a class="button is-dark is-small" @click="(!replayMode) ? $emit('modal', 'dice') : null" :disabled="replayMode">{{ (replayMode) ? "Replay Mode" : "Dice Link" }}</a>
                <a class="button is-dark is-small" @click="$emit('reset');openMenu()">Reset</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    props: {
      history: Boolean,
      replayMode: Boolean
    },
    data() {
      return {
        navbarActive: false
      }
    },
    methods: {
      openMenu() {
        this.navbarActive = !this.navbarActive;
      }
    },
    computed: {
      navbarIsActive() {
        if (this.navbarActive) {
          return 'is-active';
        }
        return false;
      },
      historyButtonIsEnabled() {
        return this.history;
      }
    }
  }
</script>

<style scoped>
  @media only screen and (max-width: 1023px) {
    .navbar-item .buttons .button {
      width: 100%;
      margin-right: 0 !important;
      padding: 1.25rem 0;
    }
  }
</style>