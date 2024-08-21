/************************************************************ IMPORTS ************************************************************/

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { RiMenuLine, RiCloseFill } from '@remixicon/react';
import logo from '../../assets/logo-light.svg';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../hooks/AuthContext';
// import Spotlight from '../utils/Spotlight';
import banner from '../../assets/banner.png';
import { Button } from '../../common/button';
import { BETTERSTACK_URI, GITHUB_URI, LINKEDIN_URI } from '../utils/Constants';

/************************************************************ IMPORTS ************************************************************/

const handleScroll = () => {
  const element = document.getElementById('features-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const HeroSection = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleGetStarted = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      if (user != null) {
        if (Object.keys(user).length !== 0) {
          localStorage.setItem('email', JSON.stringify(user.email));
          navigate('/upload-album');
        }
      } else {
        navigate('/login');
      }
    }, 1000);
  };

  const handleLogin = () => {
    setLoadingLogin(true);
    setTimeout(() => {
      setLoadingLogin(false);
      if (user != null) {
        if (Object.keys(user).length !== 0) {
          localStorage.setItem('email', JSON.stringify(user.email));
          navigate('/upload-album');
        }
      } else {
        navigate('/login');
      }
    }, 1000);
  };

  return (
    <div className="isolate bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* <Spotlight className="-top-20 left-10 md:left-60 md:-top-20" fill="white" /> */}
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex">
              <img className="h-8" src={logo} alt="Bubbles" />
              <h4 className="ml-2 text-gray-900 sm:text-2xl text-white">Bubbles</h4>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only text-white">Open main menu</span>
              <RiMenuLine className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href={GITHUB_URI} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-white">
              Github
            </a>
            <p onClick={handleScroll} className="text-sm font-semibold leading-6 text-white cursor-pointer">
              Features
            </p>
            <a href={BETTERSTACK_URI} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-white">
              Status
            </a>
            <a href={LINKEDIN_URI} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-white">
              Contact
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {loadingLogin && (
              <div className="flex items-center text-sm font-semibold leading-6 text-white cursor-pointer">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Log in
              </div>
            )}
            {!loadingLogin && (
              <p className="text-sm font-semibold leading-6 text-white cursor-pointer" onClick={handleLogin}>
                Log in
              </p>
            )}
          </div>
        </nav>

        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-black/[0.96] px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <img className="h-8" src={logo} alt="Bubbles" />
              </a>
              <h4 className="ml-2 text-white sm:text-2xl">Bubbles</h4>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only text-white">Close menu</span>
                <RiCloseFill className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a href={GITHUB_URI} target="_blank" rel="noreferrer" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white">
                    Github
                  </a>
                  <p onClick={handleScroll} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white cursor-pointer">
                    Features
                  </p>
                  <a href={BETTERSTACK_URI} target="_blank" rel="noreferrer" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white">
                    Status
                  </a>
                  <a href={LINKEDIN_URI} target="_blank" rel="noreferrer" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white">
                    Contact
                  </a>
                </div>
                <div className="py-6">
                  {loadingLogin && (
                    <div className="flex items-center text-sm font-semibold leading-6 text-white cursor-pointer">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Log in
                    </div>
                  )}
                  {!loadingLogin && (
                    <p className="text-sm font-semibold leading-6 text-white cursor-pointer" onClick={handleLogin}>
                      Log in
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      <main>
        <div className="relative py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 data-aos="zoom-in" className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 sm:text-5xl">
                Instantly Share & Celebrate
                <br />
                Your Magical Moments
              </h1>
              <p data-aos="zoom-in" className="text-xs md:text-lg mt-6 text-lg leading-8 text-neutral-300">
                With Bubbles View-Once Album Links That Pops After 5 mins
              </p>
              <div data-aos="fade-up" data-aos-duration="800" className="mt-10 flex items-center justify-center gap-x-6">
                {loadingButton && (
                  <Button className="dark" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Get Started
                  </Button>
                )}
                {!loadingButton && (
                  <Button className="dark" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                )}

                <a href={GITHUB_URI} className="text-base font-semibold leading-7 text-white">
                  Learn more <span>→</span>
                </a>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="800" className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-zinc-700 p-2 ring-1 ring-inset ring-slate-500/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img src={banner} alt="App screenshot" width={2432} height={1442} className="rounded-md shadow-2xl ring-1 ring-gray-900/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div id="features-section"></div>
    </div>
  );
};

export default HeroSection;
