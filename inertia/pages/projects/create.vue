<template>
  <Head title="Criar Projeto" />
  <theme-toggle />

  <div class="mt-7 max-w-md block mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
          Criar Novo Projeto
        </h1>
        <a class="mt-2 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 inline-flex gap-x-2 items-center" href="javascript:void(0)" @click="goBack()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
          </svg>

          Voltar para a listagem de projetos
        </a>
      </div>

      <div class="mt-5">
        <form @submit.prevent="onSubmitForm">
          <div class="grid gap-y-4">
            <div>
              <label for="title" class="block text-sm mb-2 dark:text-white required">Título:</label>
              <div class="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Informe o título..."
                  autocomplete="off"
                  @input="formData.title = ($event.target as HTMLInputElement).value"
                  :value="formData.title"
                  :class="`py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:text-gray-400 dark:placeholder-gray-500 ${formData.errors.title ? 'border-red-600' : 'border-gray-200 dark:border-gray-700'}`">
              </div>
              <p class="text-xs text-red-600 mt-2" v-if="formData.errors.title">{{ formData.errors.title[0] }}</p>
            </div>
            <div>
              <label for="startDate" class="block text-sm mb-2 dark:text-white required">Data de Início:</label>
              <div class="relative">
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  maxlength="10"
                  autocomplete="off"
                  placeholder="Infome a data de início..."
                  @input="formData.startDate = formatDate(($event.target as HTMLInputElement).value)"
                  :value="formData.startDate"
                  :class="`py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:text-gray-400 dark:placeholder-gray-500 ${formData.errors.startDate ? 'border-red-600' : 'border-gray-200 dark:border-gray-700'}`">
              </div>
              <p class="text-xs text-red-600 mt-2" v-if="formData.errors.startDate">
                {{ formData.errors.startDate[0] }}
              </p>
            </div>
            <div>
              <label for="endDate" class="block text-sm mb-2 dark:text-white required">Data de Conclusão:</label>
              <div class="relative">
                <input
                  type="text"
                  id="endDate"
                  name="endDate"
                  placeholder="Informe a data de conclusão..."
                  maxlength="10"
                  autocomplete="off"
                  @input="formData.endDate = formatDate(($event.target as HTMLInputElement).value)"
                  :value="formData.endDate"
                  :class="`py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:text-gray-400 dark:placeholder-gray-500 ${formData.errors.endDate ? 'border-red-600' : 'border-gray-200 dark:border-gray-700'}`">
              </div>
              <p class="text-xs text-red-600 mt-2" v-if="formData.errors.endDate">
                {{ formData.errors.endDate[0] }}
              </p>
            </div>
            <button type="submit" class="mt-4 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              <template v-if="formData.processing">
                <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                Carregando...
              </template>
              <template v-if="!formData.processing">
                Criar Projeto
              </template>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Head, router, useForm } from "@inertiajs/vue3";
import { useToast } from "vue-toastification";
import ThemeToggle from "~/partials/theme-toggle.vue";
import { formatDate } from "~/utils/date_utils";

const toast = useToast();
const formData = useForm({
  title: "",
  startDate: "",
  endDate: "",
})

const onSubmitForm = () => {
  if (formData.processing) return;
  formData.post('/project/create', {
    preserveState: true,
    onSuccess: () => {
      toast.success('Projeto criado com sucesso!')
    }
  })
}

const goBack = () => {
  router.visit('/project', { replace: true })
}
</script>
