<template>
  <div class="uiInputSelect">
    <input
      type="text"
      v-bind:list="id + 'list'"
      v-bind:id="id"
      v-bind:class="cheackInput(value)"
      v-bind:ref="id"
      :value="value"
      @input="updateDate()"
      v-bind:placeholder="title"
      v-bind:disabled="disabled === true"
    />
    <label class="label_for_inputs" v-if="cheackInput(value) !== false" for="text">{{ title }}</label>
    <datalist v-bind:id="id + 'list'">
      <option v-for="option in options" :key="option.id" v-bind:value="option.id">
        {{ option.id + coma + option.full_name + coma + option.date }}
      </option>
    </datalist>
  </div>
</template>
<script>
export default {
  name: 'uiInputSelect',
  data() {
    return {
      coma: ', ',
    };
  },
  props: {
    title: String,
    disabled: Boolean,
    options: Array,
    value: String,
    id: String,
  },
  methods: {
    cheackInput(val) {
      if (val === undefined || val === null || val === '') {
        return false;
      }
      return 'inputCheack';
    },
    updateDate() {
      this.$emit('select-patient', this.$refs[this.id].value);
    },
  },
};
</script>
