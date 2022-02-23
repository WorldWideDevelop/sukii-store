import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store-redux/store'

import type { Product, ProductCart } from '@lib/types'
import {
  addItemToCart,
  removeItemFromCart,
} from '@components/cart/store/cartUtils'

// declaring the types for our state

export type CounterState = {
  cartCount: number
  cartItem: ProductCart[]
}

const initialState: CounterState = {
  cartCount: 0,
  cartItem: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload
      state.cartItem = addItemToCart(state.cartItem, item)
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      const item = action.payload
      state.cartItem = removeItemFromCart(state.cartItem, item)
    },
    clearCart: (state) => {
      state.cartItem = []
    },
    // 'The increment by amount' action here, has one job and that is to take whatever cartCount is passed to it and add that to state.cartCount.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.cartCount += action.payload
    // },
  },
})
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { addToCart, removeItem, clearCart } = cartSlice.actions

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a cartCount from the state.
export const selectCartCount = (state: RootState) => {
  const cartCount = state.cart.cartItem.reduce(
    (totalQty, item) => totalQty + item.qty,
    0
  )
  return cartCount
}
export const selectCartItems = (state: RootState) => state.cart.cartItem
export const selectCartTotal = (state: RootState) =>
  state.cart.cartItem.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.qty * cartItem.price,
    0
  )
// exporting the reducer here, as we need to add this to the store
export default cartSlice.reducer
