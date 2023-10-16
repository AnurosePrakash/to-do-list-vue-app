<script setup lang="ts">
import {useBacklogListStore} from "../stores/useBacklogListStore";
import {storeToRefs} from "pinia";
import {useTodoListStore} from "@/stores/useToDoListStore";

const backlogStore = useBacklogListStore();
const toDoListStore = useTodoListStore();

const {moveToDoList} = toDoListStore;
const {backlogList, toggleCompleted} = storeToRefs(backlogStore);

</script>

<template>
  <transition-group name="list" tag="div">
    <div v-for="todo in backlogList" :key="todo.id">
      <div class="flex flex-row shadow rounded w-full py-2 px-4 mb-2">
        <input :checked="todo.completed" @click="toggleCompleted(todo.id)"
               id="input-checkbox" type="checkbox"
               class="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500"/>
        <label for="input-checkbox"
               class="ml-6 flex-1 text-black">
          <p class="font-roboto text-[15px]">{{ todo.name }}</p>
          <p class="font-roboto text-[10px]">{{ todo.updatedAt.toDateString() }}</p>
        </label>
        <button
            @click="moveToDoList(todo)"
            type="button"
            class="inline-block rounded px-2 pb-2 pt-2.5 text-[13px] text-blue-500 font-roboto font-medium leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700">
          Move to List
        </button>
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