import React,{useState} from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { SparklesIcon } from '@heroicons/react/24/outline'
import Divider from '../utils/Divider'
import AddAssignment from './AddAssignment'
import AddStudent from './AddStudent'

const CLASSLIST = [
  {name: "John" , year: 1, id:242494},
  {name: "Sylvia" , year: 2},
  {name: "Derek" , year: 4},
  {name: "Albert" , year: 3},
]

const ASSIGNMENTLIST = [
  {name: "HW1", points: 10, rubric: "Do this then this then this"},
  {name: "HW2", points: 10},
  {name: "HW3", points: 10},
  {name: "Exam 1", points: 30}
]

const Class = () => {

  const [openAddStudent,setOpenAddStudent] = useState(false);
  const [studentName,setStudentName] = useState('');
  const [studentId,setStudentId] = useState('');
  const [studentYear,setStudentYear] = useState('');

  const [openAddAssignment,setOpenAddAssignment] = useState(false);
  const [assignmentName,setAssignmentName] = useState('');
  const [assignmentPoints,setAssignmentPoints] = useState('');
  const [assignmentDetail,setAssignmentDetail] = useState('');
  const [assignmentRubric,setAssignmentRubric] = useState('');

  const handleAddAssignment = () => {
    setAssignmentName("");
    setAssignmentPoints("");
    setAssignmentDetail("");
    setAssignmentRubric("");
    setOpenAddAssignment(true);
  }

  const handleAddStudent = () => {
    setStudentName("");
    setStudentId("");
    setStudentYear("");
    setOpenAddStudent(true);
  }

  return (
    <>
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Class Name
        </h2>
        <p className="ml-1 mt-1 truncate text-sm text-gray-500">Subject</p>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
          <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <SparklesIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
            Grade Assignment
          </button>
          <button onClick={handleAddStudent} type="button" className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Student
          </button>
          <button
            onClick={handleAddAssignment}
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Assignment
          </button>
      </div>
    </div>
    <Divider/>
    <div className="flex flex-row flex-wrap">
      <div className="w-1/2">
        <div className='text-xl font-bold'>Students</div>
        <ul className="pr-10 py-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {CLASSLIST.map((s,i) => {
            return (
              <li onClick={() => {
                setStudentName(s.name);
                setStudentId(s.id);
                setStudentYear(s.year);
                setOpenAddStudent(true); 
              }} key={i} className="cursor-pointer col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">{s.name}</h3>
                  {s.id && <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    #{s.id}
                  </span>}
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">Year: {s.year}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="w-1/2">
        <div className='text-xl font-bold'>Assignments</div>
        <ul className="pr-10 py-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {ASSIGNMENTLIST.map((a,i) => {
            return (
              <li onClick={() => {
                setAssignmentDetail(a.assignmentDetail);
                setAssignmentName(a.name);
                setAssignmentPoints(a.points);
                setAssignmentRubric(a.rubric);
                setOpenAddAssignment(true);}} key={i} className="cursor-pointer col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">{a.name}</h3>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">Points: {a.points}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div> 
    </div>
    <AddAssignment name={assignmentName} points={assignmentPoints} assignmentDetail={assignmentDetail} rubricDescription={assignmentRubric} open={openAddAssignment} setOpen={setOpenAddAssignment} />
    <AddStudent name={studentName} id={studentId} year={studentYear} open={openAddStudent} setOpen={setOpenAddStudent} />
    </>
  ) 
}

export default Class