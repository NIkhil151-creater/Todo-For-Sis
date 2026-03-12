import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Define a type for a single todo item
export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

// Define a type for the slice state
interface CounterState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  todos: [],
  loading: false,
  error: null
}

// Async thunks for API calls
export const fetchTodos = createAsyncThunk('counter/fetchTodos', async () => {
  const response = await fetch('/api/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return await response.json() as Todo[];
});

export const addTodoAsync = createAsyncThunk('counter/addTodo', async (text: string) => {
  // Send as URL parameter to avoid JSON parsing issues
  const response = await fetch(`/api/todos?text=${encodeURIComponent(text)}`, {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return await response.json() as Todo;
});

export const toggleTodoAsync = createAsyncThunk('counter/toggleTodo', async (todo: Todo) => {
  const response = await fetch('/api/todos', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: todo.id, isCompleted: !todo.isCompleted })
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return await response.json() as Todo;
});

export const removeTodoAsync = createAsyncThunk('counter/removeTodo', async (id: string) => {
  const response = await fetch(`/api/todos?id=${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return id;
});

export const editTodoAsync = createAsyncThunk('counter/editTodo', async (todo: { id: string; text: string }) => {
  const response = await fetch('/api/todos', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: todo.id, text: todo.text })
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return await response.json() as Todo;
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Sync actions (for immediate UI updates)
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      // Add todo
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add todo';
      })
      // Toggle todo
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      // Remove todo
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      // Edit todo
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  }
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = counterSlice.actions;

// Typed selector
export const selectTodos = (state: { counter: CounterState }) => state.counter.todos;
export const selectLoading = (state: { counter: CounterState }) => state.counter.loading;
export const selectError = (state: { counter: CounterState }) => state.counter.error;

export default counterSlice.reducer;

