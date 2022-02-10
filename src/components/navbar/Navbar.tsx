import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { MenuIcon, ShoppingBagIcon, SearchIcon } from '@heroicons/react/outline'
import VisuallyHidden from '@reach/visually-hidden'
import tw from 'tailwind-styled-components'
import MobileMenu, { nav_item } from './MobileMenu'
import SuperHeader from './SuperHeader'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Spacer = tw.div`
  w-36
`

function Navbar() {
  const router = useRouter()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 })
  const [openModal, setOpenModal] = React.useState(false)

  const toggleModal = () => setOpenModal(!openModal)

  const activeLink = (path: string) =>
    router.pathname === path ? 'text-secondary' : ''

  return (
    <>
      <SuperHeader />
      <header className="border-t-black-primary border-t-2 border-b border-gray-300 p-5 px-4 lg:px-8">
        <section className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider lg:text-2xl">
            <span className="text-primary">Fake</span>
            Commerce
          </h1>
          <nav className="mx-auto">
            <ul className="flex space-x-8 font-semibold uppercase">
              {nav_item.map((nav) => (
                <li key={nav.name}>
                  <Link href={nav.href} passHref>
                    <a
                      className={`hover:text-secondary hover:text-opacity-60 ${activeLink(
                        nav.href
                      )}`}
                    >
                      {nav.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Spacer />
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
