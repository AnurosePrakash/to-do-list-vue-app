<script setup lang="ts">
import {computed, ref} from "vue";
import {useTodoListStore} from "@/stores/useToDoListStore";

const store = useTodoListStore();
const completedToggle = ref(false);

const showCompletedToDos = () => {
  completedToggle.value = !completedToggle.value;
};

const completedToDoList = computed(() => store.todoList.filter((t) => t.completed));

</script>

<template>
  <button
      @click="showCompletedToDos"
      class="flex mt-6 py-2 pl-3 pr-9 text-[15] font-roboto text-slate-300"
  >
    <svg v-show="completedToggle" class="w-4 h-4 mt-1 ml-2 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
    <svg v-show="!completedToggle" class="w-3 h-3 mt-1 ml-2 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         fill="none" viewBox="0 0 8 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
    </svg>
    {{ store.completedToDoCount }} Done
  </button>
  <div v-show="completedToggle" v-for="todo in completedToDoList" :key="todo.id" class="flex flex-col justify-center">
    <div class="flex flex-row shadow rounded w-full py-2 px-4 mb-2">
      <input disabled checked id="disabled-checked-checkbox" type="checkbox" value=""
             class="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500"/>
      <label for="disabled-checked-checkbox"
             class="ml-6 flex-1 text-slate-300 font-roboto">
        <p class="text-[15px] line-through">{{ todo.name }}</p>
        <p class="text-[10px]">{{ todo.updatedAt }}</p>
      </label>
    </div>
  </div>
  <hr class="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700 sm:w-full">

</template>
