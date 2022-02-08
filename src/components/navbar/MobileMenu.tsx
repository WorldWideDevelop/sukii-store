import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import tw from 'tailwind-styled-components'

import Modal from '@components/common/Modal'

interface iMobileMenuProps {
  toggleModal: () => void
  isOpenModal: boolean
}

const nav_item = [
  {
    name: 'sale',
    href: '/sale',
  },
  {
    name: 'new releases',
    href: '/new_releases',
  },
  {
    name: 'men',
    href: '/men',
  },
  {
    name: 'women',
    href: '/women',
  },
  {
    name: 'kids',
    href: '/kids',
  },
  {
    name: 'collections',
    href: '/collections',
  },
]

const Spacer = tw.div`
    h-20
`

function MobileMenu({ toggleModal, isOpenModal }: iMobileMenuProps) {
  return (
    <Modal closeModal={toggleModal} isOpen={isOpenModal}>
      <nav className="fixed top-0 right-0 flex h-full w-4/5 transform flex-col justify-between bg-white pb-8 pl-8 transition-all md:w-1/2">
        <div className="px-2 py-5 text-right lg:px-8">
          <button onClick={toggleModal} className="p-2">
            <XIcon className="h-4 w-4 hover:text-gray-300" />
          </button>
        </div>
        <ul className="my-auto space-y-2 text-left text-lg font-semibold uppercase">
          {nav_item.map((nav) => (
            <li>{nav.name}</li>
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
