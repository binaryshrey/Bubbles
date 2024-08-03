import React from 'react';
import { Box, Card, Text } from '@radix-ui/themes';
import { RiUploadCloudLine, RiAlbumLine, RiAddLine, RiFolderAddLine, RiSearchLine } from '@remixicon/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../common/tabs';

const Dashboard = () => {
  return (
    <div>
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
        <div className="w-56 bg-black border border-neutral-600 rounded-md cursor-pointer">
          <div className="bg-black m-4">
            <div>
              <RiAddLine className="mr-3 flex-shrink-0 h-6 w-6 text-neutral-600 mb-4" aria-hidden="true" />
              <p className="text-white text-sm ml-1">New Photo</p>
            </div>
          </div>
        </div>
        <div className="w-56 bg-black border border-neutral-600 rounded-md cursor-pointer">
          <div className="bg-black m-4">
            <div>
              <RiFolderAddLine className="mr-3 flex-shrink-0 h-6 w-6 text-neutral-600 mb-4" aria-hidden="true" />
              <p className="text-white text-sm ml-1">New Album</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white font-semibold text-xl mt-12 mb-4">Library</p>
      <Tabs defaultValue="viewall">
        <TabsList className="bg-zinc-700 w-30">
          <TabsTrigger value="viewall">View All</TabsTrigger>
          <TabsTrigger value="fav">Favorites</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="viewall" className="text-white">
          All your photos and albums will be displayed here.
        </TabsContent>
        <TabsContent value="fav" className="text-white">
          Mark your favorite photos and albums here.
        </TabsContent>
        <TabsContent value="archived" className="text-white">
          Your archived photos and albums will be displayed here
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
