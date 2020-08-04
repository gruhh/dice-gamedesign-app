<template>
  <div class="modal" :class="modalIsActive">
    <div class="modal-background" @click="$emit('unload')"></div>
    <div class="modal-content">
      <article class="message">
        <div class="message-header">
          <p>{{ loadModal.title }}</p>
          <button class="delete" aria-label="close" @click="$emit('unload')"></button>
        </div>
        <div class="message-body">
          <p v-html="loadModal.content"></p>
          <div class="field">
            <label class="label is-small mt-3">Link to share</label>
            <div class="control">
              <input class="input has-text-centered" type="text" v-bind:value="loadModal.link">
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalUI',
    props: {
      loadModal: {}
    },
    computed: {
      modalIsActive() {
        if (this.loadModal) {
          return 'is-active';
        }
        return false;
      }
    }
  }
</script>
