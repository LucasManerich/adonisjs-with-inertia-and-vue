/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import 'vue-toastification/dist/index.css'
import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp, router } from "@inertiajs/vue3";
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import Toast from 'vue-toastification'
import { HSStaticMethods, HSThemeSwitch } from "preline";

const appName = import.meta.env.VITE_APP_NAME || 'Task Manager'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    )
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(Toast)
      .mount(el)
  },
})

const setupPreline = () => {
  setTimeout(() => {
    HSStaticMethods.autoInit()
    HSThemeSwitch.autoInit()
  }, 100)
}

router.on('navigate', () => setupPreline())
router.on('finish', () => setupPreline())
document.addEventListener('DOMContentLoaded', () => setupPreline())
