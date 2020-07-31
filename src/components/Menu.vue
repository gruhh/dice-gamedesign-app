<template>
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
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-dark is-small" @click="$emit('reset');openMenu()">Reset</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
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
      }
    }
  }
</script>