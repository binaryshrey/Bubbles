/************************************************************ IMPORTS ************************************************************/

import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-light.svg';
import { UserAuth } from '../hooks/AuthContext';
import { Dialog, Transition } from '@headlessui/react';
import { GITHUB_ISSUES_URI } from '../utils/Constants';
import { RiHome6Line, RiQuestionLine, RiSettingsLine, RiAlbumLine, RiCloseFill, RiMenuLine } from '@remixicon/react';

/************************************************************ IMPORTS ************************************************************/

const Navbar = ({ Component, home, analytics, support, settings }) => {
  // global vars
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: RiHome6Line, current: home },
    { name: 'Album Analytics', href: '/analytics', icon: RiAlbumLine, current: analytics },
  ];

  const navigationBottom = [
    { name: 'Support', href: GITHUB_ISSUES_URI, icon: RiQuestionLine, current: support },
    { name: 'Settings', href: '/settings', icon: RiSettingsLine, current: settings },
  ];

  // state
  const { user } = UserAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // methods
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <>
      <div className="bg-black h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button type="button" className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <RiCloseFill className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4 bg-zinc-900">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img className="h-8 w-auto" src={logo} alt="Bubbles" />
                      <p className="text-xl pl-4 text-white">Bubbles</p>
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-zinc-700 text-white' : 'text-neutral-300 hover:bg-zinc-800 hover:text-neutral-300', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}>
                          <item.icon className={classNames(item.current ? 'text-white' : 'text-neutral-300 group-hover:text-neutral-300', 'mr-3 flex-shrink-0 h-4 w-4')} aria-hidden="true" />
                          {item.name}
                        </a>
                      ))}
                      <div className="flex flex-shrink-0 border-t border-zinc-800"></div>

                      {navigationBottom.map((item) => (
                        <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-zinc-700 text-white' : 'text-neutral-300 hover:bg-zinc-800 hover:text-neutral-300', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}>
                          <item.icon className={classNames(item.current ? 'text-white' : 'text-neutral-300 group-hover:text-neutral-300', 'mr-3 flex-shrink-0 h-4 w-4')} aria-hidden="true" />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-zinc-800 p-4 bg-zinc-900">
                    <Link to="/profile" className="group block w-full flex-shrink-0 bg-zinc-900">
                      <div className="flex items-center bg-zinc-900 ">
                        <div className="bg-zinc-900">
                          <img className="inline-block h-10 w-10 rounded-full" src={user.photoURL} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white group-hover:text-white">{user.displayName}</p>
                          <p className="text-sm font-medium text-neutral-300 group-hover:text-neutral-300">View profile</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0"></div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className=" h-screen hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col p-1 bg-black">
          <div className="flex min-h-0 flex-1 flex-col bg-zinc-900 rounded-lg">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <img className="h-8 w-auto" src={logo} alt="Bubbles" />
                <p className="text-xl pl-4 text-white">Bubbles</p>
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2 bg-zinc-900">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-zinc-700 text-white' : 'text-neutral-300 hover:bg-zinc-800 hover:text-neutral-300', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}>
                    <item.icon className={classNames(item.current ? 'text-white' : 'text-neutral-300 group-hover:text-neutral-300', 'mr-3 flex-shrink-0 h-4 w-4')} aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-shrink-0 border-t border-zinc-800"></div>

                {navigationBottom.map((item) => (
                  <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-zinc-700 text-white' : 'text-neutral-300 hover:bg-zinc-800 hover:text-neutral-300', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}>
                    <item.icon className={classNames(item.current ? 'text-white' : 'text-neutral-300 group-hover:text-neutral-300', 'mr-3 flex-shrink-0 h-4 w-4')} aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-shrink-0 border-t border-zinc-800 p-3">
              <Link to="/profile" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <img className="inline-block h-8 w-8 rounded-full" src={user.photoURL} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{user.displayName}</p>
                    <p className="text-xs font-medium text-neutral-300">View profile</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-zinc-800 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button type="button" className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-white " onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <RiMenuLine className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 bg-black">
            <div className="py-4">
              <div className="mx-auto max-w-7xl px-4 sm:px-4 md:px-6">
                <div className="py-2 hidden lg:block">
                  <Component />
                </div>
                <div className="py-2 overflow-y-auto lg:hidden">
                  <Component />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Navbar;
