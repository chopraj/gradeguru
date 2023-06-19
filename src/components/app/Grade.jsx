import React,{useState} from 'react'
import Divider from '../utils/Divider'
import Checklist from '../utils/Checklist'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const Grade = () => {


  const [assignmentDetail,setAssignmentDetail] = useState("")
  const [rubricDescription,setRubricDescription] = useState("")
  const [studentResponse, setStudentResponse] = useState("")


  return (
    <>
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Grade an assignment 
        </h2>
        <p className="ml-1 mt-1 truncate text-sm text-gray-500">with AI ✨</p>
      </div>
    </div>
    <Divider/>
    <div className="flex flex-row">
        <div className="w-1/2 pr-10">
            <Checklist label={"Class"}/>
            <Checklist label={"Student"}/>
            <Checklist label={"Assignment"}/>
            <div>
                <label htmlFor="project-description" className="pt-3 block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5" >
                     Assignment Detail
                </label>
            </div>
            <div className="sm:col-span-2">
            <textarea
                id="project-description"
                name="project-description"
                rows={3}
                value={assignmentDetail}
                onChange={(e) => setAssignmentDetail(e.target.value)}
                className="mt-3 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={'This is the assignment description that our AI will evaluate your students against. Be as detailed as possible for best results.'}
            />
            </div>
            <div>
                <label htmlFor="project-description" className="pt-3 block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5" >
                     Rubric Description
                </label>
            </div>
            <div className="sm:col-span-2">
            <textarea
                id="project-description"
                name="project-description"
                rows={3}
                value={rubricDescription}
                onChange={(e) => setRubricDescription(e.target.value)}
                className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={"This is the rubric our Ai will use to grade your students' submissions. Be as detailed as possible for best results."}
            />
            </div>
        </div>
        <div className="w-1/2">
            <div>
                <label htmlFor="project-description" className="pt-3 block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5" >
                     Student Response
                </label>
            </div>
            <div className="sm:col-span-2">
            <textarea
                id="project-description"
                name="project-description"
                rows={18}
                value={studentResponse}
                onChange={(e) => setStudentResponse(e.target.value)}
                className="mt-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={"This is the rubric our Ai will use to grade your students' submissions. Be as detailed as possible for best results."}
            />
            </div>
        </div>
    </div>
    <button
        type="button"
        className="mt-10 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Grade
        <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
    </>
  )
}

export default Grade

