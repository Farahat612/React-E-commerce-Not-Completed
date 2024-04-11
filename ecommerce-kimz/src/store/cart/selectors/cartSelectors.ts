import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@storestore'

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return Object.values(items).reduce((acc, qty) => {
      return acc + qty
    }, 0)
  }
)

export { getCartTotalQuantitySelector }
