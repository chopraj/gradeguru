import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import {auth} from "../firebase/config";
import { createCheckoutSession } from '../../stripe/createCheckoutSession';
import {useAuthState} from 'react-firebase-hooks/auth';
import usePremiumStatus from '../../stripe/usePremiumStatus';

const plans = [
  { name: 'Starter', priceMonthly: 10, priceYearly: 108, limit: 'Up to 5 active job postings' },
  { name: 'Pro', priceMonthly: 17, priceYearly: 180, limit: 'Up to 25 active job postings' },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Billing = () => {
  const [user,userLoading] = useAuthState(auth)
  const userIsPremium = usePremiumStatus(user);
  const [selectedPlan, setSelectedPlan] = useState(plans[1])
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);




  return (
    <>
    {!user && userLoading && <h1>Loading...</h1>}
    {!user && !userLoading && <h1>Not logged in</h1>}
    {user && !userLoading && (
      !userIsPremium ? (<><button onClick={() => createCheckoutSession(user)}>"get prem"</button></> ): "PREM"
    )}
    </>
    // <section aria-labelledby="plan-heading">
    //             <form action="#" method="POST">
    //               <div className="shadow sm:overflow-hidden sm:rounded-md">
    //                 <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
    //                   <div>
    //                     <h2 id="plan-heading" className="text-lg font-medium leading-6 text-gray-900">
    //                       Plan
    //                     </h2>
    //                   </div>

    //                   <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
    //                     <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
    //                     <div className="relative -space-y-px rounded-md bg-white">
    //                       {plans.map((plan, planIdx) => (
    //                         <RadioGroup.Option
    //                           key={plan.name}
    //                           value={plan}
    //                           className={({ checked }) =>
    //                             classNames(
    //                               planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
    //                               planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
    //                               checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
    //                               'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pr-6'
    //                             )
    //                           }
    //                         >
    //                           {({ active, checked }) => (
    //                             <>
    //                               <span className="flex items-center text-sm">
    //                                 <span
    //                                   className={classNames(
    //                                     checked ? 'bg-indigo-500 border-transparent' : 'bg-white border-gray-300',
    //                                     active ? 'ring-2 ring-offset-2 ring-gray-900' : '',
    //                                     'h-4 w-4 rounded-full border flex items-center justify-center'
    //                                   )}
    //                                   aria-hidden="true"
    //                                 >
    //                                   <span className="rounded-full bg-white w-1.5 h-1.5" />
    //                                 </span>
    //                                 <RadioGroup.Label as="span" className="ml-3 font-medium text-gray-900">
    //                                   {plan.name}
    //                                 </RadioGroup.Label>
    //                               </span>
    //                               <RadioGroup.Description
    //                                 as="span"
    //                                 className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
    //                               >
    //                                 <span
    //                                   className={classNames(
    //                                     checked ? 'text-indigo-900' : 'text-gray-900',
    //                                     'font-medium'
    //                                   )}
    //                                 >
    //                                   ${plan.priceMonthly} / mo
    //                                 </span>{' '}
    //                                 <span className={checked ? 'text-indigo-700' : 'text-gray-500'}>
    //                                   (${plan.priceYearly} / yr)
    //                                 </span>
    //                               </RadioGroup.Description>
    //                               <RadioGroup.Description
    //                                 as="span"
    //                                 className={classNames(
    //                                   checked ? 'text-indigo-700' : 'text-gray-500',
    //                                   'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
    //                                 )}
    //                               >
    //                                 {plan.limit}
    //                               </RadioGroup.Description>
    //                             </>
    //                           )}
    //                         </RadioGroup.Option>
    //                       ))}
    //                     </div>
    //                   </RadioGroup>

    //                   <Switch.Group as="div" className="flex items-center">
    //                     <Switch
    //                       checked={annualBillingEnabled}
    //                       onChange={setAnnualBillingEnabled}
    //                       className={classNames(
    //                         annualBillingEnabled ? 'bg-indigo-500' : 'bg-gray-200',
    //                         'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
    //                       )}
    //                     >
    //                       <span
    //                         aria-hidden="true"
    //                         className={classNames(
    //                           annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
    //                           'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
    //                         )}
    //                       />
    //                     </Switch>
    //                     <Switch.Label as="span" className="ml-3 text-sm">
    //                       <span className="font-medium text-gray-900">Annual billing</span>{' '}
    //                       <span className="text-gray-500">(Save 10%)</span>
    //                     </Switch.Label>
    //                   </Switch.Group>
    //                 </div>
    //                 <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
    //                   <button
    //                     type="submit"
    //                     className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
    //                   >
    //                     Save
    //                   </button>
    //                 </div>
    //               </div>
    //             </form>
    //           </section>
  )
}

export default Billing