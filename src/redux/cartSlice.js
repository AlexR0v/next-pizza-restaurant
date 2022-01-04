import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  quantity: 0,
  total: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProduct: (state, action) => {
      state.products.push(action.payload)
      state.quantity += action.payload.quantity
      state.total += action.payload.price * action.payload.quantity
    },
    resetCart: (state) => {
      state = initialState
    }
  }
})

export const { addCartProduct, resetCart } = cartSlice.actions

export const cartSelector = store => store.cart

export default cartSlice.reducer
