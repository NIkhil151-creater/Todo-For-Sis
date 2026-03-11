import React from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { fetchTodos, selectTodos } from './counterSlice'

export function Counter() {
  const todos = useAppSelector(state => selectTodos(state))
  const dispatch = useAppDispatch()

  return (
    <div>
      <span>Total Todos: {todos.length}</span>
    </div>
  )
}

