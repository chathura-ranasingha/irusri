import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  todos: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      const newTodo = {
        id: new Date().toISOString(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
