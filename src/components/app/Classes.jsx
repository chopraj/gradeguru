import React,{useEffect, useState} from 'react'
import { doc, getDoc } from "firebase/firestore";

import AddClass from './AddClass'
import Divider from '../utils/Divider'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import {db} from '../firebase/config'
import {useAuth} from '../../contexts/AuthContext'
import {useBilling} from '../../contexts/BillingContext'
import { useNavigate } from "react-router-dom";

const StarterUserSection = () => {

  const navigate = useNavigate();
  const handleGoToBilling = () => {
    navigate('/app/billing')
  }

  return (

  <div className="text-center flex flex-col items-center mt-36">
      {/* <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg> */}
      <ExclamationTriangleIcon className="h-10 w-10"/>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Oops!</h3>
      <p className="mt-1 text-sm text-gray-500">Class and Student tracking are only available for Premium users.</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoToBilling}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Upgrade Plan
        </button>
      </div>
    </div>
  )
}

const NoClassesSection = ({open,setOpen}) => {

  const handleAddClassBtn = () => {
    setOpen(true);
  }
  return (
  <div className="text-center mt-36">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Classes</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new Class.</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleAddClassBtn}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Class
        </button>
      </div>
    </div>
  )
}

const SingleClass = ({name,subject,year,id}) => {

  const navigate = useNavigate();
  
  const handleNavigateToSingleClass = () => {
    navigate(`./${id}`);
  }

  return (
    <li onClick={handleNavigateToSingleClass} className="cursor-pointer col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{name}</h3>
                <span className="inline-flex flex-shrink-0 it9ems-center rounded-full bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                  {subject}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{year}</p>
            </div>
          </div>
    </li>
  )
}

const Classes = () => {

  const {firebaseUser} = useAuth();
  const {userIsPremium, userIsStarter} = useBilling();
  const [classes,setClasses] = useState([]);
  const [classesChanged,setClassesChanged] = useState(false);
  const [loading,setLoading] = useState(false);

  const getClasses = async () => {
    setLoading(true);
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
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
    }
  }


  useEffect(() => {
    getClasses();
  },[classesChanged])

  const [slideoverOpen,setSlideoverOpen] = useState(false);
  const handleAddClassBtn = () => {
    setSlideoverOpen(true);
  }


  return (
    <>
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Your Classes
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          disabled={userIsStarter}
          onClick={handleAddClassBtn}
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Class
        </button>
      </div>
    </div>
    <Divider/>
    {loading ? (<span className="loading loading-dots loading-lg"></span>) : (
      classes && classes.length ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {classes.map((c,i) => <SingleClass key={i} id={c.id} name={c.name} subject={c.subject} year={c.year} />)}
        </ul>
      ) : userIsStarter ? <StarterUserSection/> : <NoClassesSection open={slideoverOpen} setOpen={setSlideoverOpen}/>
    )}

    <AddClass open={slideoverOpen} setOpen={setSlideoverOpen} notification={classesChanged} notifyChange={setClassesChanged} />
    </>
  )
}
export default Classes


