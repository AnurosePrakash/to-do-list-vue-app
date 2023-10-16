<script setup lang="ts">
import TodoForm from "./TodoForm.vue";
import {useBacklogListStore} from "../stores/useBacklogListStore";
import BacklogList from "@/components/BacklogList.vue";
import {ref, watch} from "vue";
import {useTodoListStore} from "@/stores/useToDoListStore";
import {storeToRefs} from "pinia";
import type ToDoItemInterface from "@/models/ToDoItem.interface";

const backlogStore = useBacklogListStore();
const toDoListStore = useTodoListStore();
const {moveToDoList} = toDoListStore;
const {toggleCompleted} = storeToRefs(backlogStore);
const searchToggle = ref(false);
const searchQuery = ref("");
const searchItems = ref<ToDoItemInterface[]>([])
const addItem = (item: string) => {
  backlogStore.addBacklog(item);
}
const sortToggle = ref(false);

const showSortByName = () => {
  sortToggle.value = !sortToggle.value;
  backlogStore.backlogList.sort(
      (item1, item2) => (item1.name < item2.name) ? 1 : (item1.name > item2.name) ? -1 : 0);
  sortToggle.value = !sortToggle.value;
};

const showSortByDate = () => {
  sortToggle.value = !sortToggle.value;
  backlogStore.backlogList.sort(function (a, b) {
    return b.updatedAt - a.updatedAt;
  });
  sortToggle.value = !sortToggle.value;
};

//To search for item with item name as searchQuery
watch(searchQuery, (currentValue) => {
  if (currentValue) {
    searchToggle.value = true;
    searchItems.value = backlogStore.backlogList.filter((item) => {
      return (
          item.name
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1
      );
    });
  } else {
    searchToggle.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full">
    <div class="flex flex-row mt-4 mb-8 justify-center lg:w-1/3">
      <input class="border-2 border-gray-300 rounded-md p-2 w-3/4" placeholder="Search item" v-model="searchQuery"/>
      <button
          class="flex-shrink-0 w-1/4 bg-gray-500 hover:bg-blue-600 focus:bg-blue-600 text-white font-roboto text-[15px] ml-4 py-1 px-4 rounded-lg shadow-md"
          @click="showSortByName()">
        Sort by name
      </button>
      <button
          class="flex-shrink-0 w-1/4 bg-gray-500 hover:bg-blue-600 focus:bg-blue-600 text-white font-roboto text-[15px] py-1 px-4 rounded-lg shadow-md ml-4"
          @click="showSortByDate()">
        Sort by date
      </button>
    </div>
    <div class="flex flex-row mt-4 mb-8 lg:justify-center lg:w-1/3 sm:w-full">
      <BacklogList v-show="!sortToggle && !searchToggle" class="flex flex-col w-full overflow-y-scroll"/>
    </div>
    <div class="flex flex-row mt-4 mb-8 justify-center lg:w-1/3 sm:w-full">
      <div class="flex flex-col w-full ">
        <div v-show="searchToggle" v-for="todo in searchItems" :key="todo.id"
             class="flex flex-row w-full shadow rounded py-2 px-4 mb-2">
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
    </div>


    <div class="flex flex-row py-10 fixed bottom-0 lg:w-1/3 sm:justify-center">
      <TodoForm @add="(item) => addItem(item)"/>
    </div>
  </div>
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