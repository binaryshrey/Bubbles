import React from 'react';
import emptyFav from '../../../assets/emptyFav.svg';

const Favorites = () => {
  return (
    <div className="h-fit flex items-center text-center justify-center mt-32">
      <img src={emptyFav} alt="Archive" className="rounded " />
    </div>
  );
};

export default Favorites;
