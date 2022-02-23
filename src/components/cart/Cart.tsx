import React from 'react'
import { XIcon } from '@heroicons/react/outline'

import { convertPrice } from '@lib/formatter'

import Modal from '@components/common/Modal'
import CartItem from './CartItem'
import { useAppSelector } from '@store-redux/hook'
import { selectCartItems, selectCartTotal } from './store/cartSlice'

interface iMobileMenuProps {
  toggleModal: () => void
  isOpenModal: boolean
}

function Cart({ toggleModal, isOpenModal }: iMobileMenuProps) {
  const cartItems = useAppSelector(selectCartItems)
  const cartTotalPrice = useAppSelector(selectCartTotal)

  return (
    <Modal closeModal={toggleModal} isOpen={isOpenModal}>
      <div className="fixed top-0 right-0 flex h-full w-4/5 transform flex-col justify-between bg-white pb-8 pl-8 transition-all md:w-1/2">
        <div>
          <div className="flex items-center justify-between px-2 py-5 lg:px-8">
            <h1 className="text-xl font-bold">SHOPPING CART</h1>
            <button onClick={toggleModal} className="p-2">
              <XIcon className="h-4 w-4 hover:text-gray-300" />
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-2 py-5 lg:px-8">
            {cartItems.map((product) => (
              <CartItem product={product} />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4 px-2 py-5 lg:px-8">
          <p className="text-xl font-semibold">
            TOTAL: <span>{convertPrice(cartTotalPrice)}</span>
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default Cart
