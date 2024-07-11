<script setup>
import { reactive, watch } from 'vue';
import CustomInput from './components/CustomInput.vue';

const inputVariables = {
  full_name: {
    label: 'Ф.И.О',
    type: 'text',
  },
  phone_number: {
    label: 'Номер телефона',
    type: 'number',
  },
  birthday: {
    label: 'Дата вашего рождения',
    type: 'calendar',
  },
  place_of_residence: {
    label: 'Место проживания',
    type: 'text',
  },
  gender: {
    label: 'Пол',
    type: 'radio',
    data: [{label: 'Мужчина', value: 'man'}, {label: 'Женщина', value: 'woman'}],
  },
  is_student: {
    label: 'Являетесь ли вы студентом ?',
    type: 'radio',
    data: [{label: 'Да', value: 'yes'}, {label: 'Нет', value: 'no'}],
  },
  education: {
    label: 'Образование ? Наименование университета, факультет ?',
    type: 'text',
  },
  family_status: {
    label: 'Семейное положение ?',
    type: 'radio',
    data: [{label: 'Замужем', value: 'married_female'}, {label: 'Женат', value: 'married_male'}, {label: 'В разводе', value: 'divorced'}, {label: 'Вдова', value: 'widow'}],
  },
  last_work_place: {
    label: 'Последние места работы (распишите последние 3 места работы)',
    type: 'text',
  },
  knowledge_of_languages: {
    label: 'Знание языков ?()',
    type: 'checkbox',
  },
  positive_skills: {
    label: 'Напишите свои положительные навыки',
    type: 'text',
  },
  worked_on_platforms: {
    label: 'В каких платформах работали? \nРаспишите пожалуйста детально ',
    example: 'exel, word, canva',
    type: 'text',
  },
  worked_on_programms: {
    label: 'В каких программах работали ?',
    example: '1с , mysoliq, SAP',
    type: 'text',
  },
  where_find_us: {
    label: 'Откуда узнали про наш Бот',
    type: 'text',
  },
  agree_with_data: {
    label: 'Даёте ли вы разрешение на обработку личных данных',
    type: 'checkbox'
  },

  field_required: 'Поле обязательно для заполнения', // there is another one in customInput
};

const rules = {
  required: (value) => !!value || inputLabels.field_required,
};

const formData = reactive({
  full_name: '',
  phone_number: '+998',
  birthday: '',
  place_of_residence: '',
  gender: '',
  is_student: false,
  education: '',
  family_status: '',
  last_work_place: '',
  knowledge_of_languages: '',
  positive_skills: '',
  worked_on_platforms: '',
  worked_on_programms: '',
  where_find_us: '',
  agree_with_data: false,
});

watch(formData.value, (newVal) => console.log(newVal))

const inputNames = Object.keys(formData);
</script>

<template>
  <v-app>
    <v-container fluid>
      <p class="text-h4 mb-6">Заполните форму ниже для продолжения 👇</p>
      <v-form ref="form">
        <custom-input
          v-for="input in inputNames"
          :key="input"
          :variables="inputVariables[input]"
          v-model="formData[input]"
        />
      </v-form>
    </v-container>
  </v-app>
</template>

<style scoped></style>
