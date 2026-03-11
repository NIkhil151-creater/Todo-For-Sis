import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { ThunkDispatch } from '@reduxjs/toolkit'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => ThunkDispatch<RootState, unknown, any> = useDispatch
export const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector

