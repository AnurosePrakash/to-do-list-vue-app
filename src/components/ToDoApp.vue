<script setup lang="ts">
import TodoForm from "./TodoForm.vue";
import TodoList from "./TodoList.vue";
import CompletedToDoDropDownComponent from "@/components/CompletedToDoDropDownComponent.vue";

import {useTodoListStore} from "../stores/useTodoListStore";

const store = useTodoListStore();

const addItem = (item: string) => {
  store.addTodo(item);
}

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full">
    <div class="flex flex-col content-between lg:w-1/3 sm:w-full">
      <CompletedToDoDropDownComponent/>
      <TodoList/>
    </div>
    <div class="flex py-10 fixed bottom-0 lg:w-1/3 sm:justify-center">
      <TodoForm @add="(item) => addItem(item)"/>
    </div>
  </div>
</template>
