/************************************************************ IMPORTS ************************************************************/

import { Link } from 'react-router-dom';
import Masonry from 'react-layout-masonry';
import logoLight from '../../../assets/logo-light.svg';

/************************************************************ IMPORTS ************************************************************/

const MasonryLayout = ({ albumData }) => {
  return (
    <div>
      <div className="max-w-4xl mx-auto md:px-32 px-8 ">
        <p className="mt-16 text-2xl text-white text-center font-album">{albumData.album_name}</p>
        <div className="mt-8">
          <Masonry columns={{ 640: 1, 768: 2 }} className="flex -m-2" columnclassname="m-2" gap={8}>
            {albumData?.album_photos?.map((url, index) => (
              <img key={index} src={url} alt={`Pic ${index}`} className="w-full h-auto object-cover rounded text-zinc-700" />
            ))}
          </Masonry>
        </div>
      </div>
      <div className="m-4">
        <Link to="https://bubbles-inc.vercel.app/" target="_blank" rel="noopener noreferrer">
          <div class="fixed bottom-0 right-0 m-4">
            <div class="bg-zinc-800 flex rounded-full items-center">
              <img src={logoLight} alt="Bubbles" className="h-3 w-auto ml-2" />
              <p className="text-white  px-2.5 py-1 shadow text-xs ">Made with Bubbles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MasonryLayout;
