<template>
  <div class="uiButton">
    <input
      type="button"
      v-bind:value="title"
      v-bind:disabled="disabled === true"
      @click="updateDate()"
    />
  </div>
</template>
<script>
export default {
  name: 'UiButton',
  props: {
    title: String,
    disabled: Boolean,
  },

  methods: {
    cheackInput(file) {
      if (!(file === '')) {
        if (!(file === undefined)) {
          return 'inputCheack'
        }
        return false
      } else {
        return false
      }
    },
    updateDate() {
      this.$emit('click')
    },
  },
}
</script>
