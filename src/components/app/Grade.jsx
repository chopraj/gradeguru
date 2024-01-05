import { ArrowUpOnSquareIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import React,{useEffect, useState} from 'react'
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

import Checklist from '../utils/Checklist'
import Divider from '../utils/Divider'
import ErrorModal from '../utils/ErrorModal'
import GradeModal from './GradeModal'
import UploadModal from './UploadModal'
import {db} from '../firebase/config'
import {useAuth} from '../../contexts/AuthContext'
import {useBilling} from '../../contexts/BillingContext'

const Grade = () => {
  const fetchClasses = true;
  const [assignmentDetail,setAssignmentDetail] = useState("")
  const [rubricDescription,setRubricDescription] = useState("")
  const [studentResponse, setStudentResponse] = useState("")
  const [loading, setLoading] = useState(false);
  

  // Checklists
  const [classSelected, setClassSelected] = useState(null);
  const [studentSelected, setStudentSelected] = useState(null);
  const [assignmentSelected, setAssignmentSelected] = useState(null);

  // Grade Modal
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState("");
  const [explanation, setExplanation] = useState("");
  const [tips, setTips] = useState("");

  const {firebaseUser} = useAuth();
  const {userIsPremium, userIsStarter, isPaying} = useBilling();
  const [classes,setClasses] = useState([{name: " ", id: 1}]);
  const [students,setStudents] = useState([{name: " ", id: 1}]);
  const [assignments,setAssignments] = useState([{name: " ", id: 1}]);

  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [showUpload, setShowUpload] = useState(false);


  const handleGrade = async () => {
    if (assignmentDetail === "" || rubricDescription === "" || studentResponse === "") {
      setShowAlert(true);
      return;
    }
    try {
      setLoading(true);
      // TODO: add middleware to check user status
      const result = await fetch("http://localhost:3001/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: userIsPremium ? "gpt-4" : "gpt-3.5-turbo",
        assignmentDetail: assignmentDetail,
        rubricDescription: rubricDescription,
        studentResponse: studentResponse
      })}).then(res => res.json()).then(res => JSON.parse(res.content))
      setGrade(result.grade);
      setExplanation(result.explanation);
      setTips(result.tips);
      setOpen(true);
    if (studentSelected) {
      const assignmentRef = doc(db, "assignments", assignmentSelected.uid);
      const submissionRef = await addDoc(collection(db, "submissions"), {
        assignmentId: assignmentRef,
        feedback: {
          grade: result.grade,
          explanation: result.explanation,
          tips: result.tips
        },
        timestamp: serverTimestamp(),
      });
      const studentRef = await updateDoc(doc(db, "students", studentSelected.uid), {
        submissions: arrayUnion(submissionRef),
      })
    }

    setLoading(false);
    } catch (err) {
      console.log(err);
      setErrorAlert(true);
      setLoading(false);
    }
    
  }

  const getClasses = async () => {
    const docRef = doc(db,"users",firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const fetchedClasses = [];
      for (const c of docSnap.data().classes) {
        const classSnap = await getDoc(c);
        if (classSnap.exists()) {
          fetchedClasses.push({id: classSnap.id, ...classSnap.data()})
        }
      }
      setClasses(fetchedClasses)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const getStudentsAndAssignments = async () => {
    const classRef = doc(db, "classes", classSelected.id);
    const classSnap = await getDoc(classRef);
    if (classSnap.exists()) {
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
  }}


  useEffect(() => {
    if (fetchClasses) {
      getClasses();
    }
  }, [fetchClasses])

  useEffect(() => {
    if (!classSelected) {
      return;
    }
    getStudentsAndAssignments();
  },[classSelected])

  useEffect(() => {
    if (!assignmentSelected) {
      setAssignmentDetail("");
      setRubricDescription("");
      return;
    }
    setAssignmentDetail(assignmentSelected.assignmentDetail);
    setRubricDescription(assignmentSelected.rubricDescription);
  },[assignmentSelected])


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
    <Alert show={showAlert} setShow={setShowAlert}/>
    <div className="flex flex-row">
        <div className="w-1/2 pr-10">
            {userIsPremium && (
              <>
              <Checklist label={"Class"} items={classes} placeholder="Class" selected={classSelected} setSelected={setClassSelected}/>
              <Checklist label={"Student"} items={students} placeholder="Choose 'Class' first" selected={studentSelected} setSelected={setStudentSelected} disabled={!classSelected}/>
              <Checklist label={"Assignment"} items={assignments} placeholder="Choose 'Class' first" selected={assignmentSelected} setSelected={setAssignmentSelected} disabled={!classSelected}/>
              </>
            )}
            

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
                placeholder={"This is the rubric our AI will use to grade your students' submissions. Be as detailed as possible for best results."}
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
                placeholder={"This is the student's response to the assignment. You can copy and paste it here."}

            />
            </div>
        </div>
    </div>
    <button
        onClick={handleGrade}
        type="button"
        disabled={loading}
        className="mt-10 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
      {loading ? (<span className="mx-5 loading loading-md loading-dots text-success "></span>) : ("Grade")}
        {!loading ? <SparklesIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" /> : ""}
    </button>
    {userIsPremium ? 
    <button
      onClick={() => setShowUpload(true)}
      type='button'
      disabled={loading}
      className="mt-10 ml-5 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {loading ? (<span className="mx-5 loading loading-md loading-dots text-success "></span>) : ("Bulk Upload")}
      {!loading ? <ArrowUpOnSquareIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" /> : ""}
    </button> : <></>}
    <GradeModal open={open} setOpen={setOpen} grade={grade} explanation={explanation} tips={tips}/>
    <ErrorModal open={errorAlert} setOpen={setErrorAlert} />
    <UploadModal open={showUpload} setOpen={setShowUpload} />
    </>
  )
}

export default Grade


const Alert = ({message,show,setShow}) => {

  useEffect(() =>{
    if (!show) {
      return;
    }
    setTimeout(() => {
      setShow(false);
    },4000)
  },[show])

  if (!show) {
    return <></>
  }

  return (
    <div className="rounded-md bg-red-50 p-4 border-l-4 border-r-4 border-red-400">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc space-y-1 pl-5">
              <li>Please ensure the Assignment Detail, Rubric Description, and Student Response fields are filled out for best results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

}