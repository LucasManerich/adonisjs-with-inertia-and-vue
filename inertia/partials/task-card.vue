<script setup lang="ts">
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";
import { useToast } from "vue-toastification";

const props = defineProps({
  id: Number,
  projectId: Number,
  title: String,
  isCompleted: Boolean,
  startDate: String,
  endDate: String,
})

const cardColor = computed(() => {
  if (props.isCompleted) return 'border-t-teal-600 dark:border-t-teal-500'
  if (areLate.value) return 'border-t-yellow-500 dark:border-t-yellow-400'
  return 'border-t-blue-600 dark:border-t-blue-500'
});

const areLate = computed(() => {
  if (props.isCompleted) return false
  if (!props.endDate) return false

  const [day, month, year] = props.endDate.split('/')
  const endDate = new Date(`${year}-${month}-${day}`)

  const today = new Date()
  return today > endDate
})

const onSuccessSetCompleted = () => {
  const toast = useToast();
  toast.success('Tarefa marcada como concluída !')
}
</script>

<template>
  <div :class="`w-full flex flex-col bg-white border border-t-4 shadow-sm rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-700/70 ${cardColor}`">
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-white">
        {{ title }}
      </h3>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        Início: <strong>{{ startDate }}</strong><br>
        Estimativa Conclusão: <strong>{{ endDate }}</strong>
      </p>
      <Link :href="`/project/${projectId}/task/${id}/set-completed`" method="post" :replace="true" :onSuccess="onSuccessSetCompleted" class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" v-if="!isCompleted">
        Marcar como Concluído
        <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </Link>
    </div>
  </div>
</template>
