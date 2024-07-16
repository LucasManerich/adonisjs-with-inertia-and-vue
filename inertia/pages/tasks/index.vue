<template>
  <Head title="Tarefas" />
  <theme-toggle />

  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <h1 class="text-xl lg:text-3xl font-bold text-gray-800 dark:text-white">
      Tarefas
    </h1>

    <a class="mt-2 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 inline-flex gap-x-2 items-center" href="javascript:void(0)" @click="goBack()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
      </svg>
      Voltar para a listagem dos projetos
    </a>

    <div class="mt-6 inline-flex gap-3 w-full">
      <div class="p-4 w-full bg-white shadow-sm rounded-lg dark:bg-gray-800 dark:shadow-gray-700/70">
        <h3 class="font-semibold uppercase tracking-widest dark:text-gray-300 text-gray-700 mb-4">Pendente</h3>

        <div class="flex flex-col gap-y-4">
          <task-card v-for="task in pendingTasks"
                     :key="task.id"
                     :id="task.id"
                     :project-id="projectId"
                     :title="task.title"
                     :is-completed="task.isCompleted"
                     :start-date="task.startDate"
                     :end-date="task.endDate"
          />
        </div>

        <Link :href="`/project/${projectId}/task/create`" class="mt-4 w-full border-2 rounded-lg border-dashed border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer flex items-center justify-center py-3 gap-x-2 text-gray-400 dark:text-gray-500 font-semibold hover:text-gray-500 dark:hover:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
          </svg>
          Adicionar Tarefa
        </Link>
      </div>
      <div class="p-4 w-full bg-white shadow-sm rounded-lg dark:bg-gray-800 dark:shadow-gray-700/70">
        <h3 class="font-semibold uppercase tracking-widest dark:text-gray-300 text-gray-700 mb-4">Concluído</h3>

        <div class="flex flex-col gap-y-4">
          <task-card v-for="task in completedTasks"
                     :key="task.id"
                     :id="task.id"
                     :project-id="projectId"
                     :title="task.title"
                     :is-completed="task.isCompleted"
                     :start-date="task.startDate"
                     :end-date="task.endDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from "~/partials/theme-toggle.vue"
import { Head, Link, router } from "@inertiajs/vue3";
import { computed } from "vue"
import TaskCard from "~/partials/task-card.vue";

const props = defineProps<{
  projectId: number;
  projectTitle: string;
  taskList: {
    id: number;
    title: string;
    isCompleted: boolean;
    startDate: string;
    endDate: string;
  }[]
}>()

const completedTasks = computed(() => {
  return props.taskList.filter(task => task.isCompleted)
})

const pendingTasks = computed(() => {
  return props.taskList.filter(task => !task.isCompleted)
})

const goBack = () => {
  router.visit('/project', {
    replace: true
  })
}
</script>
