import { CheckIcon, ClipboardIcon, XMarkIcon }  from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'

import Notification from '../utils/Notificaiton'

const GradeModal = ({open,setOpen,grade,explanation,tips}) => {

  const cancelButtonRef = useRef(null)
  const [notificationOpen, setNotificationOpen] = useState(false);


  const handleClipboardCopy = () => {
    navigator.clipboard.writeText("Grade: " + grade + "\nExplanation: " + explanation + "\nTips for future improvement: " + tips);
    setNotificationOpen(true);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="my-5 justify-center">
                  <Dialog.Title as="h3" className="flex flex-col items-center justify-center text-center text-base font-semibold leading-6 text-gray-900">
                      Assignment Graded!
                      <div className="mt-5 radial-progress text-indigo-600" style={{"--value": parseInt(grade)}}>{grade}%</div>
                    </Dialog.Title>
                  </div>
                  <div className="mt-3 sm:mt-5">
                    
                    <div className="mt-2">
                      <p className="mt-5 text-sm text-gray-500">
                        <b>Grade: </b> {grade}
                      </p>
                      <p className="mt-5 text-sm text-gray-500">
                        <b>Explanation: </b> {explanation}
                      </p>
                      <p className="mt-5 text-sm text-gray-500">
                        <b>Tips for future improvement: </b> {tips}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleClipboardCopy}
                  >
                    Copy to Clipboard <ClipboardIcon className="ml-2 -mr-0.5 h-5 w-5"/>
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel <XMarkIcon className="ml-2 -mr-0.5 h-5 w-5"/>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        {notificationOpen ? <Notification open={notificationOpen} setOpen={setNotificationOpen} message="Grade report saved to clipboard!" /> : null}
      </Dialog>
      
    </Transition.Root>
  )
}

export default GradeModal;
