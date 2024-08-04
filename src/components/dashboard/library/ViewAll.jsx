import AlbumLibraryCard from './AlbumLibraryCard';
import React from 'react';

const ViewAll = () => {
  return (
    <div className="flex gap-8 flex-wrap">
      <AlbumLibraryCard />
      <AlbumLibraryCard />
      <AlbumLibraryCard />
      <AlbumLibraryCard />
      <AlbumLibraryCard />
    </div>
  );
};

export default ViewAll;
