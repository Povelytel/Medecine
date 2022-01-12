<template>
  <div class="uiInputSelect">
    <input
      type="text"
      v-bind:list="id + 'list'"
      v-bind:id="id"
      v-bind:class="cheackInput(value)"
      ref="Picker"
      :value="value"
      @input="updateDate()"
      v-bind:placeholder="title"
      v-bind:disabled="disabled === true"
    />
    <label
      class="label_for_inputs"
      v-if="cheackInput(value) !== false"
      for="text"
      >{{ title }}</label
    >
    <datalist v-bind:id="id + 'list'">
      <option v-for="(option, idx) in options" :key="idx">{{ option }}</option>
    </datalist>
  </div>
</template>
<script>
export default {
  name: 'uiInputSelect',
  props: {
    title: String,
    disabled: Boolean,
    options: Array,
    value: String,
    id: String,
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
      this.$emit('input', this.$refs.Picker.value)
    },
  },
}
</script>
