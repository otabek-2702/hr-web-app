<script setup>
import { mdiInformation } from '@mdi/js';
import { ref } from 'vue';

const props = defineProps(['variables', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const alert = ref(false);

// rules
const field_required = 'Поле обязательно для заполнения';
const phone_number_max = 'This field exceeds maximum allowed characters'
const rules = {
  required: (v) => !!v || field_required,
  phoneNumberMax: (v) => (!!v && v.toString().length > 9) || phone_number_max,
};

const checkLabelLength = props.variables.label.length > 36; // "help" key in the if for adding another text from app object
const checkIsText = props.variables.type == 'text';
const checkIsNumber = props.variables.type == 'number';
const checkIsCalendar = props.variables.type == 'calendar';
const checkIsRadio = props.variables.type == 'radio';
</script>

<template>
  <!-- SNACKBAR -->
  <v-snackbar :timeout="3000" color="surface" multi-line v-model="alert">
    <h3 class="font-weight-light text-shades-white">
      {{ `${variables.label} \n${variables.example ?? ''}` }}
    </h3>
  </v-snackbar>

  <!-- TEXT -->
  <v-text-field
    :label="variables.label"
    :rules="[rules.required]"
    :model-value="modelValue"
    :hint="variables.example"
    persistent-hint
    @update:model-value="$emit('update:modelValue', $event)"
    class="mb-2"
    variant="outlined"
    v-if="checkIsText"
  >
    <template v-slot:append-inner v-if="checkLabelLength || variables.help">
      <v-icon :icon="mdiInformation" @click="() => (alert = !alert)"></v-icon>
    </template>
  </v-text-field>

  <!-- NUMBER -->
  <v-text-field
    :label="variables.label"
    :rules="[rules.required, phoneNumberMax]"
    :model-value="modelValue"
    :hint="variables.example"
    persistent-hint
    single-line
    type="number"
    :max="9"
    @update:model-value="$emit('update:modelValue', $event)"
    class="mb-2"
    variant="outlined"
    v-if="checkIsNumber"
  >
    <template v-slot:prepend>
      <p>+998</p>
    </template>
    <template v-slot:append-inner v-if="checkLabelLength || variables.help">
      <v-icon :icon="mdiInformation" @click="() => (alert = !alert)"></v-icon>
    </template>
  </v-text-field>

  <!-- CALENDAR -->
  <v-date-input
    clearable
    :label="variables.label"
    variant="outlined"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    prepend-icon=""
    v-if="checkIsCalendar"
  >
  </v-date-input>

  <!-- RADIO -->
  <v-radio-group
    v-else-if="checkIsRadio"
    :label="variables.label"
    :rules="[rules.required]"
    inline
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-radio v-for="radio in variables.data" :label="radio.label" :value="radio.value"></v-radio>
  </v-radio-group>
</template>

<style scoped></style>

<!-- :model-value="modelValue"
  @update:model-value="$emit('update:modelValue', $event)" -->
