import React from 'react';
import { RiFolderAddLine, RiSearchLine, RiContactsLine } from '@remixicon/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../common/tabs';
import ViewAll from './library/ViewAll';
import { Link } from 'react-router-dom';
import SnackAlert from '../../common/SnackAlert';
import Favorites from './library/Favorites';
import Archived from './library/Archived';

const Dashboard = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <div className="bg-black">
      <div className="flex justify-between items-center text-center">
        <p className="text-white font-semibold text-2xl">Dashboard</p>
        <div className="relative text-zinc-600 flex items-center text-center focus:outline-none">
          <input className=" bg-zinc-700 h-10 px-5 pr-16 rounded-lg text-sm border-zinc-700 text-white focus:outline-none focus:ring focus:ring-zinc-600 focus:border-none" type="search" name="search" placeholder="Search" />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <RiSearchLine className=" flex-shrink-0 h-4 w-4 text-neutral-500 " aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex flex-shrink-0 border-t border-zinc-800 mt-4 mb-8"></div>

      <div className="flex gap-4">
        <Link to="/new-album">
          <div className="w-56 bg-black border border-neutral-600 rounded-md cursor-pointer">
            <div className="bg-black m-4">
              <div>
                <RiFolderAddLine className="mr-3 flex-shrink-0 h-6 w-6 text-neutral-600 mb-4" aria-hidden="true" />
                <p className="text-white text-sm ml-1">New Album</p>
              </div>
            </div>
          </div>
        </Link>
        <div className="w-56 bg-black border border-neutral-600 rounded-md cursor-pointer" onClick={handleSnackbarOpen}>
          <div className="bg-black m-4">
            <div>
              <RiContactsLine className="mr-3 flex-shrink-0 h-5 w-5 text-neutral-600 mb-4" aria-hidden="true" />
              <p className="text-white text-sm ml-1">New Contact Card</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white font-semibold text-xl mt-12 mb-4">Library</p>
      <Tabs defaultValue="viewall">
        <TabsList className="bg-zinc-800 w-30">
          <TabsTrigger value="viewall">View All</TabsTrigger>
          <TabsTrigger value="fav">Favorites</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="viewall" className="text-white">
          <ViewAll />
        </TabsContent>
        <TabsContent value="fav" className="text-white">
          <Favorites />
        </TabsContent>
        <TabsContent value="archived" className="text-white">
          <Archived />
        </TabsContent>
      </Tabs>
      <SnackAlert open={snackbarOpen} message="Contacts Card Coming Soon!" severity="warning" onClose={handleSnackbarClose} />
    </div>
  );
};

export default Dashboard;
