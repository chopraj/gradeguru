import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import Logo from "../Logo";
import { NAV_ITEMS } from "./Header";

const HeaderMobileMenu = () => {
  return (
    <Popover>
      {({ close }) => (
        <>
          <Popover.Button className="flex bg-white/20 p-3 rounded-lg backdrop-blur-lg">
            <Bars3Icon className="w-6" />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 bg-black opacity-30 cursor-pointer z-5" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute h-fit w-screen inset-0 top-4 px-2 text-slate-800 z-10">
              <div className="overflow-hidden rounded-lg shadow-lg border border-slate-200">
                <div className="flex flex-col bg-white">
                  <div className="flex justify-between items-center p-6">
                    <Logo />
                    <XMarkIcon className="w-6 cursor-pointer" onClick={close} />
                  </div>
                  <div className="space-y-5 p-6">
                    {NAV_ITEMS.map(({ title, href, description }) => (
                      <a
                        key={title}
                        href={href}
                        className="flex rounded-lg justify-between"
                      >
                        <div className="flex flex-col">
                          <span className="text-xl font-medium">{title}</span>
                          <span className="text-md">{description}</span>
                        </div>
                        <ChevronRightIcon className="w-6" />
                      </a>
                    ))}
                  </div>
                  <div className="flex justify-between items-center font-medium bg-slate-100 px-6 py-3">
                    <a href="#">Log in</a>
                    <a
                      href="#"
                      className="py-3 px-5 rounded-md text-white bg-indigo-500"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default HeaderMobileMenu;
