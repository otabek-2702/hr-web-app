<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import CustomInput from "./components/CustomInput.vue";
import { useWebApp, useWebAppTheme } from "vue-tg";
import { useTheme } from "vuetify/lib/framework.mjs";

const lang = ref("uz");
const theme = useTheme()
const form = ref("");
const loading = ref(false);

onMounted(() => {
  localStorage.setItem("lang", "uz");
});

const inputVariablesRussian = {
  full_name: {
    label: "Ф.И.О",
    type: "text",
  },
  phone_number: {
    label: "Номер телефона",
    example: "77 737 27 02",
    type: "number",
    num_codes_arr: ['90', '91', '93', '95', '99', '77', '50'],
  },
  birthday: {
    label: "Дата вашего рождения дд.мм.гггг",
    help: true,
    example: "27.02.2008",
    type: "calendar",
  },
  place_of_residence: {
    label: "Место проживания",
    type: "text",
  },
  gender: {
    label: "Пол",
    type: "radio",
    data: [
      { label: "Мужчина", value: "man" },
      { label: "Женщина", value: "woman" },
    ],
  },
  is_student: {
    label: "Являетесь ли вы студентом ?",
    type: "radio",
    data: [
      { label: "Да", value: "yes" },
      { label: "Нет", value: "no" },
    ],
  },
  education: {
    label: "Образование ? Наименование университета, факультет ?",
    type: "text",
  },
  family_status: {
    label: "Семейное положение ?",
    type: "radio",
    data: [
      { label: "Замужем / Женат", value: "married" },
      { label: "В разводе", value: "divorced" },
      { label: "Вдова", value: "widow" },
    ],
  },
  last_work_place: {
    label: "Последние места работы (распишите последние 3 места работы)",
    type: "text",
  },
  knowledge_of_languages: {
    label: "Знание языков ?( пожалуйста, выберите хотя бы один язык)",
    data: [
      { label: "Узбекский язык", value: "uzbek" },
      { label: "Русский язык", value: "russian" },
      { label: "Английский язык", value: "english" },
    ],
    type: "checkbox",
  },
  positive_skills: {
    label: "Напишите свои положительные навыки",
    type: "text",
  },
  worked_on_platforms: {
    label: "В каких платформах работали? \nРаспишите пожалуйста детально ",
    example: "exel, word, canva",
    type: "text",
  },
  worked_on_programms: {
    label: "В каких программах работали ?",
    example: "1с , mysoliq, SAP",
    type: "text",
  },
  where_find_us: {
    label: "Откуда узнали про наш Бот",
    type: "text",
  },
  agree_with_data: {
    data: [
      {
        label: "Даёте ли вы разрешение на обработку личных данных",
        value: "yes",
      },
    ],
    type: "checkbox",
  },

  choose_lang: "Выберите язык",
  input_form_label: "Заполните форму ниже для продолжения 👇",
  rules_error_text: {
    field_required: "Поле обязательно для заполнения",
    phone_number_valid:
      "Пожалуйста, введите номер телефона в корректном формате.",
  },
  field_required: "Поле обязательно для заполнения",
  submit: "Отправить данные",
};

const inputVariablesUzbek = {
  full_name: {
    label: "F.I.O",
    type: "text",
  },
  phone_number: {
    label: "Telefon raqamingiz",
    example: "77 737 27 02",
    type: "number",
    num_codes_arr: ['90', '91', '93', '95', '99', '77', '50'],
  },
  birthday: {
    label: "Tug‘ilgan sanangiz (kun.oy.yil)",
    help: true,
    example: "27.02.2008",
    type: "calendar",
  },
  place_of_residence: {
    label: "Yashash joyingiz",
    type: "text",
  },
  gender: {
    label: "Jinsingiz",
    type: "radio",
    data: [
      { label: "Erkak", value: "man" },
      { label: "Ayol", value: "woman" },
    ],
  },
  is_student: {
    label: "Hozirda talabamisiz?",
    type: "radio",
    data: [
      { label: "Ha", value: "yes" },
      { label: "Yo‘q", value: "no" },
    ],
  },
  education: {
    label: "Ma'lumotingiz, Ta'lim olgan Universitetingiz nomi, fakulteti?",
    type: "text",
  },
  family_status: {
    label: "Oilaviy holatingiz?",
    type: "radio",
    data: [
      { label: "Turmush qurgan", value: "married" },
      { label: "Ajrashgan", value: "divorced" },
      { label: "Beva", value: "widow" },
    ],
  },
  last_work_place: {
    label: "Oxirgi ish joylaringiz (oxirgi 3ta ish joyini yozing)",
    type: "text",
  },
  knowledge_of_languages: {
    label: "Til bilimingiz? (iltimos, kamida bitta tilni tanlang)",
    data: [
      { label: "O‘zbek tili", value: "uzbek" },
      { label: "Rus tili", value: "russian" },
      { label: "Ingliz tili", value: "english" },
    ],
    type: "checkbox",
  },
  positive_skills: {
    label: "O‘z ijobiy ko‘nikmalaringizni yozing",
    type: "text",
  },
  worked_on_platforms: {
    label: "Qaysi platformalarda ishlagansiz? Iltimos, batafsil yozing",
    example: "exel, word, canva",
    type: "text",
  },
  worked_on_programms: {
    label: "Qaysi dasturlarda ishlagansiz?",
    example: "1s, mysoliq, SAP",
    type: "text",
  },
  where_find_us: {
    label: "Biz haqimizda qayerdan bildingiz?",
    type: "text",
  },
  agree_with_data: {
    data: [
      {
        label: "Shaxsiy ma'lumotlaringizni qayta ishlashga rozilik berasizmi",
        value: "yes",
      },
    ],
    type: "checkbox",
  },

  choose_lang: "Tilni tanlang",
  input_form_label: "Davom etish uchun quyidagi formalarni to‘ldiring 👇",
  rules_error_text: {
    field_required: "Maydonni to‘ldirish majburiy",
    phone_number_valid:
      "Iltimos, telefon raqamingizni to‘g‘ri formatda kiriting.",
  },
  submit: "Ma’lumotlarni yuborish",
};

const formData = reactive({
  full_name: "",
  phone_number: "",
  birthday: "",
  place_of_residence: "",
  gender: "",
  is_student: false,
  education: "",
  family_status: "",
  last_work_place: "",
  knowledge_of_languages: [],
  positive_skills: "",
  worked_on_platforms: "",
  worked_on_programms: "",
  where_find_us: "",
  agree_with_data: false,
});

const inputNames = Object.keys(formData);

// LANGUAGUE
const inputVariables = ref(
  JSON.parse(
    JSON.stringify(
      lang.value === "uz" ? inputVariablesUzbek : inputVariablesRussian
    )
  )
);

watch(lang, (newValue) => {
  if (newValue === "uz") {
    inputVariables.value = inputVariablesUzbek;
    localStorage.setItem("lang", "uz");
  } else {
    inputVariables.value = inputVariablesRussian;
    localStorage.setItem("lang", "ru");
  }
});

// TELEGRAM
const { initDataUnsafe, sendData } = useWebApp();
const {colorScheme} = useWebAppTheme()
console.log()
if (!initDataUnsafe.hash) {
  // window.close()
}
// sendData('JSON.stringify(formData)');
// theme
if (colorScheme == 'dark') {
  theme.global.name.value = 'customDarkTheme'
} else{
  theme.global.name.value = 'customLightTheme'
}
// lang
if (initDataUnsafe?.user?.language_code == 'ru') {
  lang.value = 'ru'
} else {
  lang.value = 'uz'
}


const handleSubmit = async () => {
  loading.value = true;
  const { valid } = await form.value.validate();
  if (valid) {
    console.log(formData);
    sendData(JSON.stringify(formData));
  } else {
    console.log("validation error", valid);
  }
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <v-app>
    <v-container fluid>
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
      <v-form ref="form" @submit.prevent="handleSubmit">
        <custom-input
          v-for="input in inputNames"
          :key="input"
          :variables="inputVariables[input]"
          v-model="formData[input]"
          :rulesErrorText="inputVariables.rules_error_text"
        />
        <v-btn
          :loading="loading"
          class="mt-2"
          :text="inputVariables.submit"
          type="submit"
          block
        ></v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>

<style scoped></style>
