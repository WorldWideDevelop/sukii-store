import axios from 'axios'
import React from 'react'
import { ShoppingCartIcon, XIcon } from '@heroicons/react/outline'

import Modal from '@components/common/Modal'
import CartItem from './CartItem'

import { convertPrice, formatAmountForStripe } from '@lib/formatter'
import { useAppSelector } from '@store-redux/hook'
import type { CheckOutItem } from '@lib/types'
import getStripe from '@lib/getStripe'
import { selectCartItems, selectCartTotal } from './store/cartSlice'

interface iMobileMenuProps {
  toggleModal: () => void
  isOpenModal: boolean
}

function Cart({ toggleModal, isOpenModal }: iMobileMenuProps) {
  const cartItems = useAppSelector(selectCartItems)
  const cartTotalPrice = useAppSelector(selectCartTotal)

  const redirectToCheckout = async () => {
    let items: CheckOutItem[] = []
    if (cartItems.length) {
      items = cartItems.map((item) => ({
        name: item.title,
        amount: formatAmountForStripe(item.price, 'usd'),
        currency: 'usd',
        quantity: item.qty,
      }))
    }

    const {
      data: { id },
    } = await axios.post('/api/checkout_sessions', { items })

    const stripe = await getStripe()
    await stripe?.redirectToCheckout({ sessionId: id })
  }

  const hasCartItems = cartItems.length > 0

  return (
    <Modal closeModal={toggleModal} isOpen={isOpenModal}>
      <div className="fixed top-0 right-0 flex h-full w-4/5 max-w-sm transform flex-col justify-between bg-white pb-8 pl-4 transition-all md:w-1/2 lg:pl-8">
        <div className="h-3/4 overflow-y-auto">
          <div className="flex items-center justify-between py-5 lg:px-6">
            <h1 className="text-xl font-bold">SHOPPING CART</h1>
            <button onClick={toggleModal} className="p-2">
              <XIcon className="h-4 w-4 hover:text-gray-300" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 px-2 py-5 lg:px-6">
            {hasCartItems ? (
              cartItems.map((product) => (
                <CartItem key={product.id} product={product} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 text-gray-700">
                <ShoppingCartIcon className="h-20 w-20 " />
                <h1 className="text-2xl">CART EMPTY</h1>
              </div>
            )}
          </div>
        </div>
        <div className="-ml-2 flex flex-col space-y-4 px-2 py-5 lg:ml-0 lg:px-6">
          <p className="flex items-center justify-between text-xl font-semibold">
            ORDER TOTAL: <span>{convertPrice(cartTotalPrice)}</span>
          </p>
          <div>
            <button
              disabled={!hasCartItems}
              onClick={redirectToCheckout}
              className={`rounded-md bg-secondary px-4 py-1 text-white hover:bg-opacity-70 ${
                !hasCartItems &&
                'cursor-not-allowed bg-opacity-40 hover:bg-opacity-40'
              }`}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Cart
