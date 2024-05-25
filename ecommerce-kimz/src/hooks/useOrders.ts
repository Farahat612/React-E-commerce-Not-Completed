import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getOrdersPerUser } from '@store/orders/ordersSlice'
import { resetOrderStatus } from '@store/orders/ordersSlice'
import { IProduct } from '@types'

const useOrders = () => {
  const dispatch = useAppDispatch()

  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct[]>([])

  const { ordersList } = useAppSelector((state) => state.orders)

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProduct([])
  }

  const viewDetailsHandler = (id: number) => {
    const productDetails = ordersList.find((order) => order.id === id)

    const newItems = productDetails?.items ?? []
    setShowModal(true)
    setSelectedProduct((prev) => [...prev, ...newItems])
  }

  useEffect(() => {
    const promise = dispatch(getOrdersPerUser())

    return () => {
      promise.abort()
      dispatch(resetOrderStatus())
    }
  }, [dispatch])
  return { ordersList, showModal, handleCloseModal, viewDetailsHandler, selectedProduct }
}

export default useOrders
