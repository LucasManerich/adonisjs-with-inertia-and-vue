<template>
  <Head title="Criar Tarefa" />
  <theme-toggle />

  <div class="mt-7 max-w-md block mx-auto">
    <ol class="flex items-center justify-center whitespace-nowrap">
      <li class="inline-flex items-center">
        <Link href="/project" :replace="true" class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-gray-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
          Projetos
        </Link>
        <svg class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </li>
      <li class="inline-flex items-center">
        <Link :href="`/project/${projectId}/task`" :replace="true" class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-gray-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
          {{ projectTitle }}
          <svg class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </Link>
      </li>
      <li class="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200" aria-current="page">
        Nova Tarefa
      </li>
    </ol>

    <div class="mt-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
            Criar Nova Tarefa
          </h1>
          <a class="mt-2 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 inline-flex gap-x-2 items-center" href="javascript:void(0)" @click="goBack()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
              <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>
            Voltar para a visualização do projeto
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
              <div class="inline-flex gap-1.5">
                <date-chip-badge label="2 dias" @click="formData.endDate = addTwoDaysOnCurrentDate()" />
                <date-chip-badge label="7 dias" @click="formData.endDate = addSevenDaysOnCurrentDate()" />
                <date-chip-badge label="15 dias" @click="formData.endDate = addFifteenDaysOnCurrentDate()" />
                <date-chip-badge label="30 dias" @click="formData.endDate = addThirtyDaysOnCurrentDate()" />
              </div>
              <button type="submit" class="mt-4 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                <template v-if="formData.processing">
                  <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                  Carregando...
                </template>
                <template v-if="!formData.processing">
                  Criar Tarefa
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Head, Link, router, useForm } from "@inertiajs/vue3";
import DateChipBadge from "~/partials/date-chip-badge.vue";
import { useToast } from "vue-toastification";
import {
  addFifteenDaysOnCurrentDate,
  addSevenDaysOnCurrentDate, addThirtyDaysOnCurrentDate,
  addTwoDaysOnCurrentDate,
  currentDateFormatted,
  formatDate,
} from "~/utils/date_utils";
import ThemeToggle from "~/partials/theme-toggle.vue";

const props = defineProps<{
  projectId: number;
  projectTitle: string;
}>()

const toast = useToast();
const formData = useForm({
  title: "",
  startDate: currentDateFormatted(),
  endDate: "",
})

const goBack = () => {
  router.visit(`/project/${props.projectId}/task`, { replace: true });
}

const onSubmitForm = () => {
  if (formData.processing) return;
  formData.post('/project/' + props.projectId + '/task/create', {
    preserveState: true,
    onSuccess: () => {
      toast.success('Tarefa criada com sucesso!')
    }
  })
}
</script>
