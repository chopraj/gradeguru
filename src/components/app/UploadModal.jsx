import { ArrowDownTrayIcon, CheckIcon, ClipboardIcon, XMarkIcon }  from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'

import Notification from '../utils/Notificaiton'

const UploadModal = ({open,setOpen,grade,explanation,tips,isAlreadyGraded,name}) => {

  const cancelButtonRef = useRef(null)
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedFile , setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recievedGrade, setRecievedGrade] = useState(false);
  const [responseBlob, setResponseBlob] = useState(null);


  const handleFileChange = (e) => {
    console.log('hello',e.target.files[0])
    e.preventDefault();

    setSelectedFile(e.target.files[0]);
    
  }

  const handleFileSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const response = await fetch('http://localhost:3001/file', {
            method: 'POST',
            body: formData
        })
        const blob = await response.blob();
        console.log(blob);
        setResponseBlob(blob);
        console.log(response, response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }

    setSelectedFile(null);
    setLoading(false);
    setRecievedGrade(true);
    
  }



  const downloadExcel = () => {
    if (!responseBlob) {
        console.error('No file available for download');
        return;
    }

    console.log(responseBlob instanceof Blob); // This should be true


    // Create a URL for the blob
    const url = window.URL.createObjectURL(responseBlob);

    // Create an anchor element and set the URL as the href
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grades.xlsx'; // Set the file name for the download

    // Append the anchor to the document and trigger a click to download
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};




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
                
<div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-200">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{selectedFile === null ? (<><span className="font-semibold">Click to upload</span> or drag and drop</>) : <span className="font-semibold">File uploaded!</span>}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">.xlxs, .xls, or .csv (MAX 500MB)</p>
        </div>
        <input onChange={(e) => handleFileChange(e)} id="dropzone-file" type="file" className="hidden"  accept=".xlsx, .xls" />
    </label>
</div> 

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {recievedGrade ? (
                    <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={downloadExcel}
                  >
                     {!loading ? <ArrowDownTrayIcon className="mr-2 h-5 w-5" aria-hidden="true" /> : ""}
                    {loading ? (<span className="mx-5 loading loading-md loading-dots text-success "></span>) : ("Download Grade Report")}
                    
                  </button>
                  ) : (
                    <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleFileSubmit}
                  >
                     {!loading ? <ClipboardIcon className="mr-2 h-5 w-5" aria-hidden="true" /> : ""}
                    {loading ? (<span className="mx-5 loading loading-md loading-dots text-success "></span>) : ("Bulk Grade")}
                    
                  </button>
                  )}
                  
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

export default UploadModal;
