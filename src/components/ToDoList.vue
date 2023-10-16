<script setup lang="ts">
import {useTodoListStore} from "../stores/useTodoListStore";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import {useBacklogListStore} from "@/stores/useBacklogListStore";

const toDoStore = useTodoListStore();
const backlogStore = useBacklogListStore();


const {todoList} = storeToRefs(toDoStore);
const {toggleCompleted, deleteTodo} = toDoStore;
const {moveBacklog} = backlogStore;
let isOpen = ref(false);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <transition-group name="list" tag="div">
    <div v-for="todo in todoList" :key="todo.id" class="flex flex-col">
      <div v-if="!todo.completed" class="flex flex-row shadow rounded w-full py-2 px-4 mb-2">
        <input :checked="todo.completed" @click="toggleCompleted(todo.id)"
               id="input-checkbox" type="checkbox"
               class="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500"/>
        <label for="input-checkbox"
               class="ml-6 flex-1 text-black">
          <p class="font-roboto text-[15px]">{{ todo.name }}</p>
          <p class="font-roboto text-[10px]">{{ todo.updatedAt.toDateString() }}</p>
        </label>
        <div class="relative">
          <button
              class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-700 bg-white rounded-lg hover:bg-gray-100"
              @click="toggleDropdown">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 viewBox="0 0 16 3">
              <path
                  d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
          </button>
          <div v-if="isOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right
                rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu"
               aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1 font-roboto text-[15px]">
              <button class="block px-4 py-2" role="menuitem" @click="moveBacklog(todo)">Move to Backlog</button>
              <button class="block px-4 py-2" role="menuitem" @click="deleteTodo(todo.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
