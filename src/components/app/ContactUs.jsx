import { BugAntIcon, ChatBubbleLeftRightIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

import React from 'react'

const ContactUs = () => {
  return (
    <div className="isolate px-6 py-5 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Feel free to reach out for any reason. Our team will get back to you within 2 business days.
        </p>
      </div>
      <div className="mx-auto mt-20 max-w-lg space-y-16">
        <div className="flex gap-x-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">Sales support</h3>
            <p className="mt-2 leading-7 text-gray-600">
              Let us help you figure out the right plan for your use case. 
            </p>
            <p className="mt-4">
              <a href="mailto:gradeguru.ai@gmail.com" className="text-sm font-semibold leading-6 text-indigo-600">
                Contact us <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
            <BugAntIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">Bug reports</h3>
            <p className="mt-2 leading-7 text-gray-600">
              If you find a bug report it here and we'll solve the issue as soon as possible.
            </p>
            <p className="mt-4">
              <a href="mailto:gradeguru.ai@gmail.com" className="text-sm font-semibold leading-6 text-indigo-600">
                Report a bug <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
            <ComputerDesktopIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">Technical support</h3>
            <p className="mt-2 leading-7 text-gray-600">
              Having troble with the software? We're here to help.
            </p>
            <p className="mt-4">
              <a href="mailto:gradeguru.ai@gmail.com" className="text-sm font-semibold leading-6 text-indigo-600">
                Get tech help <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ContactUs;