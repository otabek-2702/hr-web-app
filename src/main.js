import { createApp } from 'vue'
import VueTelegram from 'vue-tg'

// Vuetify
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/lib/labs/components.mjs'

// Components
import App from './App.vue'

const customDarkTheme = {
  dark: true,
  colors: {
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF'
  },
}
const customLightTheme = {
  dark: false,
  colors: {
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: '#F0F0F0',
    surface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000'
  },
};


const vuetify = createVuetify({
  components: {
    VDateInput,
    ...components,
  },
  directives,
  theme: {
    defaultTheme: "customDarkTheme",
    themes: {
      customDarkTheme,
      customLightTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

createApp(App).use(vuetify).use(VueTelegram).mount('#app')