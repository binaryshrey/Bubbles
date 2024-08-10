/************************************************************ IMPORTS ************************************************************/

import Library from './Library';
import { Link } from 'react-router-dom';
import { Input } from '../../common/input';
import upload from '../../assets/upload.svg';
import { RiSearchLine } from '@remixicon/react';

/************************************************************ IMPORTS ************************************************************/

const Dashboard = () => {
  return (
    <div className="bg-black">
      <div className="flex justify-between items-center text-center">
        <p className="text-white font-semibold text-2xl">Dashboard</p>
        <div className="relative text-zinc-600 flex items-center text-center focus:outline-none">
          <Input className="h-10 px-5 pr-16 rounded-lg text-sm dark" type="search" name="search" placeholder="Search" />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <RiSearchLine className=" flex-shrink-0 h-4 w-4 text-neutral-500 " aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex flex-shrink-0 border-t border-zinc-800 mt-4 mb-8"></div>

      <Link to="/upload-album">
        <div className="mt-8 cursor-pointer">
          <div className="border-2 border-dashed rounded border-zinc-700 w-full h-64 bg-neutral-900 flex justify-center text-center">
            <div className="flex flex-col justify-center items-center">
              <img src={upload} alt="upload" className="w-20 h-20" />
              <p className="text-neutral-300 text-md mt-4">Tap to upload your Image</p>
              <p className="text-neutral-600 text-xs">Supports: PNG, JPEG, JPG, WEBP (5 mb max)</p>
            </div>
          </div>
        </div>
      </Link>

      <p className="text-white font-semibold text-2xl mt-12 mb-4">Library</p>
      <Library />
    </div>
  );
};

export default Dashboard;
