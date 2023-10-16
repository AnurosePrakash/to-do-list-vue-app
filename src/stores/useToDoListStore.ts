import {defineStore} from "pinia";
import {computed, ref} from 'vue';
import type ToDoItemInterface from "@/models/ToDoItem.interface";
import {useBacklogListStore} from "@/stores/useBacklogListStore";

export const useTodoListStore =
    defineStore("todoList", () => {

        const todoList = ref<ToDoItemInterface[]>([]);
        let id = 0;
        const backlogStore = useBacklogListStore();

        const completedToDoCount = computed(() => {
            return todoList.value.filter((t) => t.completed).length
        });
        const addTodo = (itemName: string) => {
            todoList.value.push({name: itemName, id: id++, updatedAt: new Date(), completed: false});
        }
        const deleteTodo = (itemID: number) => {
            todoList.value = todoList.value.filter((object) => {
                return object.id !== itemID;
            });
        }
        const moveToDoList = (item: ToDoItemInterface) => {
            todoList.value.push({name: item.name, id: item.id, updatedAt: item.updatedAt, completed: item.completed});
            backlogStore.backlogList = backlogStore.backlogList.filter((object) => {
                return object.id !== item.id;
            });
        }
        const toggleCompleted = (idToFind: number) => {
            const todo = todoList.value.find((obj) => obj.id === idToFind);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
        return {todoList, completedToDoCount, addTodo, deleteTodo, moveToDoList, toggleCompleted}
    });

