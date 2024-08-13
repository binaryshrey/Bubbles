/************************************************************ IMPORTS ************************************************************/

import { Link } from 'react-router-dom';

/************************************************************ IMPORTS ************************************************************/

const CTA = () => {
  return (
    <div className="bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h4 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 sm:text-5xl">Share Magical Moments with Bubbles.</h4>
            <p className="mt-6 text-lg leading-8 text-neutral-300">Start using our app today!</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/login" className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-black shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
