import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { MenuIcon, ShoppingBagIcon, SearchIcon } from '@heroicons/react/outline'
import VisuallyHidden from '@reach/visually-hidden'
import tw from 'tailwind-styled-components'
import type { Categories } from '@lib/types'

import MobileMenu from './MobileMenu'

import SuperHeader from './SuperHeader'
import { cleanString } from '@lib/formatter'
import { A } from '@components/common'

const Spacer = tw.div`
  w-36
`

function Navbar() {
  const router = useRouter()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 })
  const [openModal, setOpenModal] = React.useState(false)
  const [categories, setCategories] = React.useState<Categories[]>([])

  React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('https://fakestoreapi.com/products/categories')
      const categories = await res.json()
      const transform = categories.map((d: string) => ({
        name: d,
        href: cleanString(d),
      }))
      setCategories(transform)
    }
    fetchCategories()
  }, [])

  const toggleModal = () => setOpenModal(!openModal)

  const activeLink = (path: string) =>
    router.asPath === path ? 'text-secondary' : ''

  return (
    <>
      <SuperHeader />
      <header className="border-t-black-primary border-t-2 border-b border-gray-300 p-5 px-4 lg:px-8">
        <section className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider lg:text-2xl">
            <span className="text-primary">Fake</span>
            Commerce
          </h1>
          {!isTabletOrMobile && (
            <nav className="mx-auto">
              <ul className="flex space-x-8 font-semibold uppercase">
                <li>
                  <Link href="/" passHref>
                    <A className={`${activeLink('/')}`}>ALL</A>
                  </Link>
                </li>
                {categories.map((nav: Categories) => (
                  <li key={nav.name}>
                    <Link href={nav.href} passHref>
                      <A className={`${activeLink(`/${nav.href}`)}`}>
                        {nav.name}
                      </A>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
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
        <MobileMenu
          nav_item={categories}
          toggleModal={toggleModal}
          isOpenModal={openModal}
          activeLink={activeLink}
        />
      )}
    </>
  )
}

export default Navbar
