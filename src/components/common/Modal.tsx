import { Dialog, Transition } from '@headlessui/react'
import React, { ReactNode } from 'react'

interface iModal {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
}

function Modal({ isOpen, closeModal, children }: iModal) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-60" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {/* <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
