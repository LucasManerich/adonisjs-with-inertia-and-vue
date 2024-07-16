<script setup lang="ts">
import { Link } from "@inertiajs/vue3"
import { computed } from "vue";

const props = defineProps({
  id: Number,
  title: String,
  startDate: String,
  endDate: String,
  hasOverdueTasks: Boolean,
  completedPercentage: Number,
})

const firstThreeChars = computed(() => {
  return props.title?.substring(0, 3).toUpperCase()
})
</script>

<template>
  <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/70">
    <div class="h-40 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
      <div class="h-20 w-20 shadow uppercase flex items-center justify-center tracking-widest rounded-3xl bg-white font-bold text-2xl text-gray-600">
        {{ firstThreeChars }}
      </div>
    </div>
    <div class="p-4 md:p-6">
        <span class="block mb-1 text-sm font-bold uppercase text-blue-600 dark:text-blue-500" v-if="!hasOverdueTasks">
          Em andamento
        </span>
        <span class="block mb-1 text-sm font-bold uppercase text-red-600 dark:text-red-500" v-if="hasOverdueTasks">
          Atrasado
        </span>
      <h3 class="text-xl font-bold text-gray-800 dark:text-gray-300 dark:hover:text-white">
        {{ title }}
      </h3>
      <p class="mb-3 text-sm text-gray-500 dark:text-gray-500">
        De <strong>{{ startDate }}</strong> até <strong>{{ endDate }}</strong>
      </p>

      <div>
        <div class="inline-block mb-2 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500" :style="`margin-inline-start: calc(${completedPercentage}% - 1.25rem)`">{{ completedPercentage }}%</div>
        <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" :aria-valuenow="completedPercentage" aria-valuemin="0" aria-valuemax="100">
          <div class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500" :style="`width: ${completedPercentage}%`"></div>
        </div>
      </div>
    </div>
    <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
      <Link :href="`/project/${id}/task`" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-b-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800" href="#">
        Visualizar
      </Link>
    </div>
  </div>
</template>
