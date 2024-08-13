/************************************************************ IMPORTS ************************************************************/

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoLight from '../../../assets/logo-light.svg';
import { ReactImageCarouselViewer } from 'react-image-carousel-viewer';

/************************************************************ IMPORTS ************************************************************/

const LayoutThree = ({ albumData }) => {
  // state
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const albumImages = albumData?.album_photos.map((item) => ({ src: item }));

  useEffect(() => {
    // hack to remove the top-0 class from the img elements to show the image carousel properly
    const imgElements = document.querySelectorAll('img');
    imgElements.forEach((img) => {
      img.classList.remove('md:top-0');
    });
  }, [isOpen]);
  return (
    <div>
      <div className="max-w-4xl mx-auto md:px-32 px-8 flex flex-col justify-center">
        <p className="mt-16 text-2xl text-white text-center font-album">{albumData.album_name}</p>
        <div className="mt-8 max-w-4xl aspect-w-1 aspect-h-1">
          <div className="flex h-full w-full items-center justify-center">
            <div className="grid h-full w-full gap-3 grid-cols-8 grid-rows-8 ">
              <div className="col-span-4 row-span-4 flex items-center justify-center">
                <img
                  src={albumData?.album_photos[0]}
                  alt="Pic 1"
                  className="w-full h-full object-cover rounded-xl cursor-pointer"
                  onClick={() => {
                    setIndex(0);
                    setIsOpen(true);
                  }}
                />
              </div>

              <div className="col-span-4 row-span-4 flex items-center justify-center">
                <img
                  src={albumData?.album_photos[1]}
                  alt="Pic 2"
                  className="w-full h-full object-cover rounded-xl cursor-pointer"
                  onClick={() => {
                    setIndex(1);
                    setIsOpen(true);
                  }}
                />
              </div>

              <div className="col-span-8 row-span-4 flex items-center justify-center">
                <img
                  src={albumData?.album_photos[2]}
                  alt="Pic 3"
                  className="w-full h-full object-cover rounded-xl cursor-pointer"
                  onClick={() => {
                    setIndex(2);
                    setIsOpen(true);
                  }}
                />
              </div>
              <ReactImageCarouselViewer open={isOpen} onClose={() => setIsOpen(false)} images={albumImages} startIndex={index} />
            </div>
          </div>
        </div>
      </div>
      <div className="m-4">
        <Link to="https://bubbles-inc.vercel.app/" target="_blank" rel="noopener noreferrer">
          <div className="fixed bottom-0 right-0 m-4">
            <div className="bg-zinc-800 flex rounded-full items-center">
              <img src={logoLight} alt="Bubbles" className="h-3 w-auto ml-2" />
              <p className="text-white  px-2.5 py-1 shadow text-xs ">Made with Bubbles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LayoutThree;
