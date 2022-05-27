import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task } from "../../types"

interface TodoState {
  todos: Array<Task>
}

const initialState: TodoState = {
  todos: []
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask(state, { payload }: PayloadAction<{ title: string, note: string, deadlineUnix?: number, favourite?: boolean }>) {
      const todoId = Date.now()

      const { title, note, deadlineUnix, favourite } = payload

      const newTask: Task = {
        note,
        title,
        deadlineUnix,
        id: todoId,
        completed: false,
        favourite: favourite ? favourite : false,
        deleted: false
      }

      return { ...state, todos: [...state.todos, newTask] }
    },
    setCompleted(state, { payload }: PayloadAction<{ id: number, completed: boolean }>) {
      return {
        ...state,
        todos: state.todos.map(i => i.id !== payload.id ? i : { ...i, completed: payload.completed })
      }
    },

    setFavourite(state, { payload }: PayloadAction<{ id: number, favourite: boolean }>) {
      return {
        ...state,
        todos: state.todos.map(i => i.id !== payload.id ? i : { ...i, favourite: payload.favourite })
      }
    },
    deleteTask(state, { payload }: PayloadAction<{ id: number, deleted: boolean }>) {
      return {
        ...state,
        todos: state.todos.map(i => i.id !== payload.id ? i : { ...i, deleted: payload.deleted, favourite: false })
      }
    },
    clearBin(state) {
      return {
        ...state,
        todos: state.todos.filter(i => !i.deleted)
      }
    }
  },
})

export default todoSlice.reducer
