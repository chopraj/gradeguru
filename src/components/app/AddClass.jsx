import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import {addDoc, arrayUnion, collection, doc, setDoc, updateDoc} from 'firebase/firestore'

import { XMarkIcon } from '@heroicons/react/24/outline'
import {db} from '../firebase/config'
import {useAuth} from '../../contexts/AuthContext'

const AddClass = ({open,setOpen,notifyChange,notification}) => {
  const {firebaseUser} = useAuth();
  const [name,setName] = useState('');
  const [subject,setSubject] = useState('');
  const [year,setYear] = useState('');

  const handleAddClass = async () => {
    console.log("Starting to add class...")
    try {
      const classRef = await addDoc(collection(db, "classes"),{
        name: name,
        subject: subject,
        year: parseInt(year),
        assignments: [],
        students: []
      });
      const userRef = await updateDoc(doc(db,"users",firebaseUser.uid),{
        classes: arrayUnion(classRef)
      });
      console.log("Added class successfully!");
      notifyChange(!notification);
      setOpen(false);
    } catch (err) {
      console.log(err,err.message);
    }
  };

  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              New class (This cannot be edited later)
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Get started by filling in the information below to create your new class.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Project name */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Class name
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              name="class-name"
                              id="class-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-description"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Subject
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              name="class-subject"
                              id="class-subject"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-description"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Year
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              name="class-year"
                              id="class-year"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* Maybe add an add students section here?*/}

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddClass}
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddClass