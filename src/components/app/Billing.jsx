import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import Divider from '../utils/Divider';
import {auth} from "../firebase/config";
import { createCheckoutSession } from '../../stripe/createCheckoutSession';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useBilling } from '../../contexts/BillingContext';
import { useNavigate } from 'react-router-dom';
import usePremiumStatus from '../../stripe/usePremiumStatus';
import useStarterStatus from '../../stripe/useStarterStatus';

const plans = [
  { name: 'Starter', priceMonthly: 15, priceYearly: 162, limit: 'Starter plan: base model, lightning fast grading' },
  { name: 'Premium', priceMonthly: 20, priceYearly: 216, limit: 'Premium Plan: upgraded AI model, student tracking, etc' },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Billing = () => {
  const [user] = useAuthState(auth);
  const { userIsPremium, userIsStarter, isPaying } = useBilling();
  const [selectedPlan, setSelectedPlan] = useState(plans[1])
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    if (userIsPremium) {
      setSelectedPlan(plans[1])
    } else if (userIsStarter) {
      setSelectedPlan(plans[0])
    } else if (!userIsPremium && !userIsStarter) {
      setSelectedPlan(plans[0]) // Default to the first plan
    }
    setLoading(false)
  },[userIsPremium, userIsStarter])

  const handleManageBtn = () => {
    if (isPaying) { // Go to 
      window.location.replace("https://billing.stripe.com/p/login/eVa03E4Zu3bG9KU144"); 
    } else {
      // TODO: eventually add annual billing here too 
      let isProPlan = selectedPlan === plans[1]
      setLoading(true);
      createCheckoutSession(user,isProPlan)
      setLoading(false);
    }
  }


  return (
    <>
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Billing
        </h2>
        <p className="ml-1 mt-1 truncate text-sm text-gray-500">GradeGuru is a proud Stripe partner</p>
      </div>
    </div>
    <Divider/>
    <section aria-labelledby="plan-heading">
        <form action="#" method="POST">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
              <div>
                <h2 id="plan-heading" className="text-lg font-medium leading-6 text-gray-900">
                  {loading ? "------" : isPaying ? "Manage your plans" : "Sign up for a plan to use GradeGuru's tech!"}
                </h2>
              </div>

              <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                <div className="relative -space-y-px rounded-md bg-white">
                  {plans.map((plan, planIdx) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan}
                      className={({ checked }) =>
                        classNames(
                          planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                          planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                          checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
                          'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pr-6'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <span className="flex items-center text-sm">
                            <span
                              className={classNames(
                                checked ? 'bg-indigo-500 border-transparent' : 'bg-white border-gray-300',
                                active ? 'ring-2 ring-offset-2 ring-gray-900' : '',
                                'h-4 w-4 rounded-full border flex items-center justify-center'
                              )}
                              aria-hidden="true"
                            >
                              <span className="rounded-full bg-white w-1.5 h-1.5" />
                            </span>
                            <RadioGroup.Label as="span" className="ml-3 font-medium text-gray-900">
                              {plan.name}
                            </RadioGroup.Label>
                          </span>
                          <RadioGroup.Description
                            as="span"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                          >
                            <span
                              className={classNames(
                                checked ? 'text-indigo-900' : 'text-gray-900',
                                'font-medium'
                              )}
                            >
                              ${plan.priceMonthly} / mo
                            </span>{' '}
                            <span className={checked ? 'text-indigo-700' : 'text-gray-500'}>
                              (${plan.priceYearly} / yr)
                            </span>
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className={classNames(
                              checked ? 'text-indigo-700' : 'text-gray-500',
                              'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                            )}
                          >
                            {plan.limit}
                          </RadioGroup.Description>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <Switch.Group as="div" className="flex items-center">
                <Switch
                  checked={annualBillingEnabled}
                  onChange={setAnnualBillingEnabled}
                  className={classNames(
                    annualBillingEnabled ? 'bg-indigo-500' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3 text-sm">
                  <span className="font-medium text-gray-900">Annual billing</span>{' '}
                  <span className="text-gray-500">(Save 10%)</span>
                </Switch.Label>
              </Switch.Group>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <a

                onClick={handleManageBtn}
                className="cursor-pointer inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                {loading ? (<span className="mx-5 loading loading-md loading-dots text-success "></span>) : isPaying ? "Manage Subscription and Billing info" : "Subscribe to a plan"}
              </a>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default Billing