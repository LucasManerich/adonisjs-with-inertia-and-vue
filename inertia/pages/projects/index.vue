<template>
  <Head title="Projetos" />
  <theme-toggle />

  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <h1 class="text-xl lg:text-3xl font-bold text-gray-800 dark:text-white">
      Meus Projetos
    </h1>

    <div class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <project-card
        v-for="project in projectList"
        :key="project.id"
        :id="project.id"
        :title="project.title"
        :startDate="project.startDate"
        :endDate="project.endDate"
        :completedPercentage="project.completedPercentage"
        :hasOverdueTasks="project.hasOverdueTasks"
      />
      <Link href="/project/create" class="group w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-gray-400 hover:dark:border-gray-600">
        <div class="py-10 flex flex-col gap-2 items-center justify-center text-gray-500 dark:text-gray-700 font-semibold group-hover:text-gray-600 dark:group-hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar Projeto
        </div>
      </Link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import ProjectCard from "~/partials/project-card.vue";
import ThemeToggle from "~/partials/theme-toggle.vue";

defineProps<{
  projectList: {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    completedPercentage: number;
    hasOverdueTasks: boolean;
  }[];
}>()
</script>
