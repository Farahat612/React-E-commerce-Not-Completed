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

const itemQuantityAvailabilityCheckingSelector = createSelector(
  (itemQuantity) => itemQuantity,
  (_, itemMax) => itemMax,
  (itemQuantity, itemMax) => {
    const currentItemQuantityInCart = itemQuantity || 0
    const currentRemainingQuantity = itemMax - currentItemQuantityInCart
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false
    return { currentRemainingQuantity, quantityReachedToMax }
  }
)

export {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
}
