import React,{useEffect, useState} from 'react'
import { doc, getDoc } from "firebase/firestore";
import {useNavigate, useParams} from 'react-router-dom'

import AddAssignment from './AddAssignment'
import AddStudent from './AddStudent'
import Divider from '../utils/Divider'
import { PlusIcon } from '@heroicons/react/20/solid'
import { SparklesIcon } from '@heroicons/react/24/outline'
import {db} from '../firebase/config'

const Class = () => {

  const navigate = useNavigate()
  const {classId} = useParams()
  const [className,setClassName] = useState("---");
  const [classSubject,setClassSubject] = useState("---");
  const [classYear,setClassYear] = useState("---");

  const [students,setStudents] = useState([]);
  const [studentFBID,setStudentFBID] = useState('');
  const [openAddStudent,setOpenAddStudent] = useState(false);
  const [studentName,setStudentName] = useState('');
  const [studentId,setStudentId] = useState('');
  const [studentYear,setStudentYear] = useState('');
  const [studentsChanged,setStudentsChanged] = useState(false);

  const [assignments,setAssignments] = useState([]);
  const [assignmentFBID,setAssignmentFBID] = useState('');
  const [openAddAssignment,setOpenAddAssignment] = useState(false);
  const [assignmentName,setAssignmentName] = useState('');
  const [assignmentPoints,setAssignmentPoints] = useState('');
  const [assignmentDetail,setAssignmentDetail] = useState('');
  const [assignmentRubric,setAssignmentRubric] = useState('');
  const [assignmentsChanged,setAssignmentsChanged] = useState(false);

  const handleAddAssignment = () => {
    setAssignmentFBID("");
    setAssignmentName("");
    setAssignmentPoints("");
    setAssignmentDetail("");
    setAssignmentRubric("");
    setOpenAddAssignment(true);
  }

  const handleAddStudent = () => {
    setStudentFBID("");
    setStudentName("");
    setStudentId("");
    setStudentYear("");
    setOpenAddStudent(true);
  }

  const handleNavToGradetype = () => {
    navigate("../../grade")
  }

  const getStudentsFromClass = async () => {
    const classRef = doc(db, "classes", classId);
    const classSnap = await getDoc(classRef);
    if (classSnap.exists()) {
      const fetchedStates = [];
      for (const s of classSnap.data().students) {
        const studentSnap = await getDoc(s);
        if (studentSnap.exists()) {
          fetchedStates.push({id:studentSnap.id,...studentSnap.data()});
        }
      }
      setStudents(fetchedStates);
    }
  }

  const getAssignmentsFromClass = async () => {
    const classRef = doc(db, "classes", classId);
    const classSnap = await getDoc(classRef);
    if (classSnap.exists()) {
      const fetchedStates = [];
      for (const a of classSnap.data().assignments) {
        const assignmentSnap = await getDoc(a);
        if (assignmentSnap.exists()) {
          fetchedStates.push({id:assignmentSnap.id,...assignmentSnap.data()});
        }
      }
      setAssignments(fetchedStates);
    }
  }

  const getClassInfo = async () => {
    const classRef = doc(db, "classes", classId);
    const classSnap = await getDoc(classRef);
    if (classSnap.exists()) {
      setClassName(classSnap.data().name);
      setClassSubject(classSnap.data().subject);
      setClassYear(classSnap.data().year);
      const fetchedStudents = [];
      const fetchedAssignments = [];
      for (const s of classSnap.data().students) {
        const studentSnap = await getDoc(s);
        if (studentSnap.exists()) {
          fetchedStudents.push({uid:studentSnap.id,...studentSnap.data()});
        }
      }
      for (const a of classSnap.data().assignments) {
        const assignmentSnap = await getDoc(a);
        if (assignmentSnap.exists()) {
          fetchedAssignments.push({uid:assignmentSnap.id,...assignmentSnap.data()});
        }
      }
      setStudents(fetchedStudents);
      setAssignments(fetchedAssignments);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  
  useEffect(() => {
    getClassInfo();
  }, []) 


  useEffect(() => {
    getStudentsFromClass();
  },[studentsChanged])

  useEffect(() => {
    getAssignmentsFromClass();
  },[assignmentsChanged])


  return (
    <>
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {className}
        </h2>
        <p className="ml-1 mt-1 truncate text-sm text-gray-500">{classSubject} - {classYear}</p>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
          <button onClick={handleNavToGradetype} type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
          {students.map((s,i) => {
            return (
              <li onClick={() => {
                setStudentFBID(s.uid);
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
          {assignments.map((a,i) => {
            return (
              <li onClick={() => {
                setAssignmentFBID(a.uid);
                setAssignmentDetail(a.assignmentDetail);
                setAssignmentName(a.name);
                setAssignmentPoints(a.points);
                setAssignmentRubric(a.rubricDescription);
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
    <AddAssignment firebaseDocId={assignmentFBID} setFirebaseDocId={setAssignmentFBID} name={assignmentName} setName={setAssignmentName} points={assignmentPoints} setPoints={setAssignmentPoints} assignmentDetail={assignmentDetail} setAssignmentDetail={setAssignmentDetail} rubricDescription={assignmentRubric} setRubricDescription={setAssignmentRubric} open={openAddAssignment} setOpen={setOpenAddAssignment} notifyAssignmentsChange={setAssignmentsChanged} notification={assignmentsChanged}/>
    <AddStudent firebaseDocId={studentFBID} setFirebaseDocId={setStudentFBID} name={studentName} setName={setStudentName} id={studentId} setId={setStudentId} year={studentYear} setYear={setStudentYear} open={openAddStudent} setOpen={setOpenAddStudent} notifyStudentChange={setStudentsChanged} notification={studentsChanged}/>
    </>
  ) 
}

export default Class