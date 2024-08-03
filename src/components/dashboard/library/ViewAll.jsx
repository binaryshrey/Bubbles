import LibraryCard from '../../../common/LibraryCard';
import React from 'react';

const ViewAll = () => {
  return (
    <div className="flex gap-8 flex-wrap">
      <LibraryCard />
      <LibraryCard />
      <LibraryCard />
      <LibraryCard />

      <LibraryCard />
    </div>
  );
};

export default ViewAll;
