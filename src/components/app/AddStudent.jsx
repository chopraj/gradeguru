import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import {addDoc, arrayUnion, collection, doc, setDoc, updateDoc} from 'firebase/firestore'

import { XMarkIcon } from '@heroicons/react/24/outline'
import {db} from '../firebase/config'
import { useParams } from 'react-router-dom'

const AddStudent = ({open,setOpen,firebaseDocId,setFirebaseDocId,name,setName,id,setId,year,setYear,notifyStudentChange,notification}) => {

  const {classId} = useParams();
  const handleAddStudent = async () => {
    console.log("Starting to add student...")
    try {
      const studentRef = await addDoc(collection(db, "students"),{
        name: name,
        id: id,
        year: year,
        submissions: []
      });
      const classRef = await updateDoc(doc(db,"classes",classId),{
        students: arrayUnion(studentRef)
      })
      notifyStudentChange(!notification)
      setOpen(false);
    } catch (err) {
      console.log(err,err.message);
    }
  }


  const handleUpdateStudent = async () => {
    console.log("Starting to update student...")
    try {
      const studentRef = await updateDoc(doc(db,"students",firebaseDocId),{
        name: name,
        id: id,
        year: year,
      });
      notifyStudentChange(!notification)
      setOpen(false);
    } catch (err) {
      console.log(err,err.message);
    }
  }

  const handleSaveStudent = () => {
    if (firebaseDocId === "") {
      handleAddStudent();
    } else {
      handleUpdateStudent();
    }
  }

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
                              Save Student
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Continue by ensuring the following info about your student is correct.
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
                              Student name
                            </label>
                          </div>
                          <div className="sm:col-span-2 pb-3">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              name="student-name"
                              id="student-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Student ID
                            </label>
                          </div>
                          <div className="sm:col-span-2 pb-3">
                            <input
                              type="text"
                              value={id}
                              onChange={(e) => setId(e.target.value)}
                              name="student-ID"
                              id="studebt-ID"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Year/Grade
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              name="student-year"
                              id="student-year"
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
                          onClick={handleSaveStudent}
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
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

export default AddStudent;