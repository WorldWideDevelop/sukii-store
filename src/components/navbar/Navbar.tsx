import React from 'react'
import { MenuIcon, ShoppingBagIcon, SearchIcon } from '@heroicons/react/outline'

import MobileMenu from './MobileMenu'
import SuperHeader from './SuperHeader'
import VisuallyHidden from '@reach/visually-hidden'
import { useMediaQuery } from 'react-responsive'

function Navbar() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 })
  const [openModal, setOpenModal] = React.useState(false)

  const toggleModal = () => setOpenModal(!openModal)

  return (
    <>
      <SuperHeader />
      <header className="border-t-black-primary border-t-4 border-b-2 p-5 px-4 lg:px-8">
        <section className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider lg:text-2xl">
            <span className="text-primary">Fake</span>
            Commerce
          </h1>
          {isTabletOrMobile && (
            <div className="flex items-center space-x-3 lg:hidden">
              <button onClick={toggleModal}>
                <ShoppingBagIcon className="h-5 w-5" />
                <VisuallyHidden>Cart</VisuallyHidden>
              </button>
              <button onClick={toggleModal}>
                <SearchIcon className="h-5 w-5" />
                <VisuallyHidden>Search</VisuallyHidden>
              </button>
              <button onClick={toggleModal}>
                <MenuIcon className="h-5 w-5" />
                <VisuallyHidden>Menu</VisuallyHidden>
              </button>
            </div>
          )}
        </section>
      </header>

      {isTabletOrMobile && (
        <MobileMenu toggleModal={toggleModal} isOpenModal={openModal} />
      )}
    </>
  )
}

export default Navbar
