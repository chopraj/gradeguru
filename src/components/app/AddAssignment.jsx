import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import {addDoc, arrayUnion, collection, doc, setDoc, updateDoc} from 'firebase/firestore'

import { XMarkIcon } from '@heroicons/react/24/outline'
import {db} from '../firebase/config'
import { useParams } from 'react-router-dom'

export default function AddAssignment({open,setOpen,firebaseDocId,setFirebaseDocId,name,setName,points,setPoints,assignmentDetail,setAssignmentDetail,rubricDescription,setRubricDescription,notifyAssignmentsChange,notification}) {
  
  const {classId} = useParams();
  
  const handleAddAssignment = async () => {
    console.log("Starting to add assignment...")
    try {
      const assignmentRef = await addDoc(collection(db, "assignments"),{
        name: name,
        points: points,
        assignmentDetail: assignmentDetail,
        rubricDescription: rubricDescription,
      });
      const classRef = await updateDoc(doc(db,"classes",classId),{
        assignments: arrayUnion(assignmentRef)
      });
      console.log("Added assignment successfully!");
      notifyAssignmentsChange(!notification);
      setOpen(false);
    } catch (err) {
      console.log(err,err.message);
    }
  }

  const handleUpdateAssignment = async () => {
    console.log("Starting to update assignment...")
    try {
      const assignmentRef = await updateDoc(doc(db,"assignments",firebaseDocId),{
        name: name,
        points: points,
        assignmentDetail: assignmentDetail,
        rubricDescription: rubricDescription,
      });
      console.log("Updated assignment successfully!");
      notifyAssignmentsChange(!notification);
      setOpen(false);
    } catch (err) {
      console.log(err,err.message);
    }
  }

  const handleSave = async () => {
    if (firebaseDocId === "") {
      handleAddAssignment();
    } else {
      handleUpdateAssignment();
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
                              Save Assignment
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              Get started by filling in the information below to create your new assignment for your students.
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
                              Assignment name
                            </label>
                          </div>
                          <div className="sm:col-span-2 pb-3">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              name="project-name"
                              id="project-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Total points
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="number"
                              value={points}
                              onChange={(e) => setPoints(e.target.value)}
                              name="project-points"
                              id="project-points"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        {/* Project description */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                            <label
                              htmlFor="project-description"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Assignment Detail
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                              id="project-detail"
                              value={assignmentDetail}
                              onChange={(e) => setAssignmentDetail(e.target.value)}
                              name="project-detail"
                              rows={3}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder={'This is the assignment description that our AI will evaluate your students against. Be as detailed as possible for best results.'}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="project-description"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Rubric Description
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                              id="project-description"
                              value={rubricDescription}
                              onChange={(e) => setRubricDescription(e.target.value)}
                              name="project-description"
                              rows={3}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder={"This is the rubric our Ai will use to grade your students' submissions. Be as detailed as possible for best results. "}
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
                          onClick={handleSave}
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
