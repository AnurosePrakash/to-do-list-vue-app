import {defineStore} from "pinia";
import {ref} from 'vue';
import type ToDoItemInterface from "@/models/ToDoItem.interface";
import {useTodoListStore} from "@/stores/useToDoListStore";

export const useBacklogListStore =
    defineStore("backlogList", () => {

        const backlogList = ref<ToDoItemInterface[]>([]);
        let backlogId = 0;
        const toDoStore = useTodoListStore();
        const addBacklog = (itemName: string) => {
            backlogList.value.push({name: itemName, id: backlogId++, updatedAt: new Date(), completed: false});
        }

        const moveBacklog = (item: ToDoItemInterface) => {
            backlogList.value.push({
                name: item.name,
                id: item.id,
                updatedAt: item.updatedAt,
                completed: item.completed
            });
            toDoStore.todoList = toDoStore.todoList.filter((object) => {
                return object.id !== item.id;
            });
        }

        const toggleCompleted = (idToFind: number) => {
            const todo = backlogList.value.find((obj) => obj.id === idToFind);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
        return {backlogList, addBacklog, moveBacklog, toggleCompleted}
    });
