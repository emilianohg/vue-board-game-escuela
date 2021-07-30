<template>
  <div>
    <label :for="id" class="my-2">{{ title }}</label>
    <input
        :id="id"
        :type="type"
        class="form-control"
        :maxlength="maxlength"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        :value="value"
        @input="$emit('input', $event.target.value)"
    />
    <span v-if="error" class="text-danger">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    id: {
      type: [String, Number],
      require: true,
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    maxlength: {
      type: Number,
      default: 100,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    submitted: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
  },
};
</script>

<style>

</style>
