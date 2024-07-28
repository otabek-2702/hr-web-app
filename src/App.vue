<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import CustomInput from './components/CustomInput.vue';
import { useWebApp, useWebAppTheme } from 'vue-tg';
import { useTheme } from 'vuetify/lib/framework.mjs';
import langValues from './lang-values/';

const lang = ref('uz');
const inputVariables = ref(langValues[lang.value]);
const theme = useTheme();
const form = ref('');
const loading = ref(false);

// onMounted(() => {
//   localStorage.setItem('lang', 'uz');
// });

const formData = reactive({
  full_name: '',
  phone_number: '',
  birthday: '',
  place_of_residence: '',
  gender: '',
  is_student: false,
  education: '',
  family_status: '',
  last_work_place: '',
  knowledge_of_languages: [],
  positive_skills: '',
  worked_on_platforms: '',
  worked_on_programms: '',
  where_find_us: '',
  agree_with_data: false,
});

const inputNames = Object.keys(formData);

// LANGUAGUE

watch(lang, (newValue) => {
  // localStorage.setItem('lang', newValue);
  inputVariables.value = langValues[newValue];
});

// TELEGRAM
const { initDataUnsafe, sendData } = useWebApp();
const { colorScheme } = useWebAppTheme();
console.log();
if (!initDataUnsafe.hash) {
  // alert("please use tg bot");
  // window.location.href = "https://t.me/test_hr_mini_app_bot";
  // window.close()
}

// theme
if (colorScheme == 'dark') {
  theme.global.name.value = 'customDarkTheme';
} else {
  theme.global.name.value = 'customLightTheme';
}
// lang
if (initDataUnsafe?.user?.language_code === 'ru') {
  lang.value = 'ru';
} else {
  lang.value = 'uz';
}

const handleSubmit = async () => {
  loading.value = true;
  const { valid } = await form.value.validate();
  if (valid) {
    console.log(formData);
    sendData(JSON.stringify(formData));
  } else {
    console.log('validation error', valid);
  }
  loading.value = false;
};
</script>

<template>
  <v-app>
    <v-container fluid style="min-height: 100vh !important">
      <v-row class="pt-2 pb-5 px-4" align="center">
        <p class="font-weight-medium" style="font-size: 18px">
          {{ inputVariables.choose_lang }}
        </p>
        <v-spacer></v-spacer>
        <v-select
          :items="[
            { title: 'O‘zbek tili ', value: 'uz' },
            { title: 'Русский язык', value: 'ru' },
          ]"
          v-model="lang"
          variant="solo"
          max-width="180"
          hide-details
        ></v-select>
      </v-row>
      <p class="text-h4 mb-6">{{ inputVariables.input_form_label }}</p>
      <v-form ref="form" class="py-4" @submit.prevent="handleSubmit">
        <custom-input
          v-for="input in inputNames"
          :key="input"
          :variables="inputVariables[input]"
          v-model="formData[input]"
          :rulesErrorText="inputVariables.rules_error_text"
        />
        <v-btn
          :loading="loading"
          size="large"
          :text="inputVariables.submit"
          type="submit"
          block
        ></v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<style scoped></style>
