import React from 'react';
import AlbumLibraryCard from './library/AlbumLibraryCard';

const Library = () => {
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

export default Library;
