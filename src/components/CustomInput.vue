<script setup>
import { mdiInformation } from '@mdi/js';
import { ref } from 'vue';

const props = defineProps(['variables', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const alert = ref(false);

// phoneNumber
const inpuRef = ref('');

const formatNumber = (value) => {
  const parts = [];
  if (value.length > 0) parts.push(value.slice(0, 2)); // First 2 digits
  if (value.length > 2) parts.push(value.slice(2, 5)); // Next 3 digits
  if (value.length > 5) parts.push(value.slice(5, 7)); // Next 2 digits
  if (value.length > 7) parts.push(value.slice(7, 9)); // Last 2 digits
  return parts.join(' ');
};

const onPhoneNumberInput = (event) => {
  const value = event.target.value;
  const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  if (numericValue.length > 9) {
    const numericValueSliced = numericValue.slice(0, 9);

    // saving to local ref
    event.target.value = numericValueSliced;
    inpuRef.value = formatNumber(numericValueSliced);
  } else {
    // saving to local ref
    inpuRef.value = formatNumber(numericValue);
  }
  // saving to the reactive in the app
  emit('update:modelValue', `+998${inpuRef.value.replace(/\s+/g, '')}`);
};
// phone number end

// calendarData
const formatCalendarData = (value) => {
  const parts = [];
  if (value.length > 0) parts.push(value.slice(0, 2)); // First 2 
  if (value.length > 2) parts.push(value.slice(2, 4)); // Next  2
  if (value.length > 4) parts.push(value.slice(4, 9)); // Next 4 
  return parts.join('.');
};

const onformatCalendarInput = (event) => {
  const value = event.target.value;
  const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  if (numericValue.length > 9) {
    const numericValueSliced = numericValue.slice(0, 9);

    // saving to local ref
    event.target.value = numericValueSliced;
    inpuRef.value = formatCalendarData(numericValueSliced);
  } else {
    // saving to local ref
    inpuRef.value = formatCalendarData(numericValue);
  }
  // saving to the reactive in the app
  emit('update:modelValue', inpuRef.value.replace(/\./g, ''));
};


// rules
const field_required = 'Поле обязательно для заполнения';
const phone_number_valid = 'Пожалуйста, введите номер телефона в корректном формате.';
const rules = {
  required: (v) => !!v || field_required,
  phoneNumberMax: (v) => !(v.length < 12) || phone_number_valid,
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
    <h3 class="font-weight-regular text-shades-white ">
      {{ `${variables.label}` }}
    </h3>
      <h3 class="font-weight-regular text-shades-white mt-2" v-if="variables.example">
        Пример:
      <span class="font-weight-black">{{variables.example}}</span>
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
    :rules="[rules.required, rules.phoneNumberMax]"
    :hint="variables.example"
    persistent-hint
    single-line
    type="text"
    maxlength="13"
    @input="onPhoneNumberInput"
    v-model="inpuRef"
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
  <v-text-field
    :label="variables.label"
    :rules="[rules.required]"
    :hint="variables.example"
    persistent-hint
    single-line
    type="text"
    maxlength="10"
    @input="onformatCalendarInput"
    v-model="inpuRef"
    class="mb-2"
    variant="outlined"
    v-if="checkIsCalendar"
  >
    <template v-slot:append-inner v-if="checkLabelLength || variables.help">
      <v-icon :icon="mdiInformation" @click="() => (alert = !alert)"></v-icon>
    </template>
  </v-text-field>

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
