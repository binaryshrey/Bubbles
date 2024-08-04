import React from 'react';
import emptyArchive from '../../../assets/emptyArchive.svg';

const Archived = () => {
  return (
    <div>
      <div className="h-fit flex items-center text-center justify-center mt-32">
        <img src={emptyArchive} alt="Archive" className="rounded " />
      </div>
    </div>
  );
};

export default Archived;
