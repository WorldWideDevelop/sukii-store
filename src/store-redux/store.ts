import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import cartReducer from '@components/cart/store/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: false,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
