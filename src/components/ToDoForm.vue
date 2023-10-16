<script setup lang="ts">
import {ref} from "vue";

const todo = ref("");
const emit = defineEmits(["add"]);

const addItem = (item: string) => {
  if (item) {
    emit('add', item)
    todo.value = '';
  }
}
</script>

<template>
  <div class="flex flex-row w-full mx-auto space-x-3">
    <input class="border-2 border-gray-300 font-roboto text-[15px] rounded-md p-2 w-3/4" v-model="todo"
           placeholder="New To do item"/>
    <button
        class="flex-shrink-0 w-1/4 bg-gray-500 hover:bg-blue-600 text-white font-roboto text-[15px] py-2 px-4 rounded-lg shadow-md"
        @click="addItem(todo)">Add Item
    </button>
  </div>
</template>