import logo from '../../assets/logo-light.svg';

const PageNotFound = () => {
  return (
    <div className="relative isolate overflow-hidden bg-black h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex">
              <img className="h-8" src={logo} alt="" />
              <h4 className="ml-2 text-white sm:text-2xl">Bubbles</h4>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <p className="mt-6 text-lg leading-8 text-white">
              404<span className="text-gray-400"> | Page Not Found.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
