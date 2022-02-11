import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import Modal from '@components/common/Modal'
import { Categories } from '@lib/types'
import Link from 'next/link'

interface iMobileMenuProps {
  toggleModal: () => void
  isOpenModal: boolean
  nav_item: Categories[]
  activeLink: (path: string) => string
}

function MobileMenu({
  nav_item,
  toggleModal,
  isOpenModal,
  activeLink,
}: iMobileMenuProps) {
  return (
    <Modal closeModal={toggleModal} isOpen={isOpenModal}>
      <nav className="fixed top-0 right-0 flex h-full w-4/5 transform flex-col justify-between bg-white pb-8 pl-8 transition-all md:w-1/2">
        <div className="px-2 py-5 text-right lg:px-8">
          <button onClick={toggleModal} className="p-2">
            <XIcon className="h-4 w-4 hover:text-gray-300" />
          </button>
        </div>
        <ul className="my-auto space-y-2 text-left text-lg font-semibold uppercase">
          <li>
            <Link href="/" passHref>
              <a
                className={`hover:text-secondary hover:text-opacity-60 ${activeLink(
                  '/'
                )}`}
              >
                ALL
              </a>
            </Link>
          </li>
          {nav_item.map((nav) => (
            <li key={nav.name}>
              <Link href={nav.href} passHref>
                <a
                  className={`hover:text-secondary hover:text-opacity-60 ${activeLink(
                    `/${nav.href}`
                  )}`}
                >
                  {nav.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2 text-left text-sm">
          <li>Terms and Conditions</li>
          <li>Privacy Policy</li>
          <li>Contact Us</li>
        </ul>
      </nav>
    </Modal>
  )
}

export default MobileMenu
