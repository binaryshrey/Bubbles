import React from 'react';
import logo from '../../assets/logo-light.svg';
import { UserAuth } from '../hooks/AuthContext';
import ProfileMenu from '../utils/ProfileMenu';

const Bubbles = () => {
  const { user } = UserAuth();

  return (
    <div className="bg-black h-screen">
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <a href="/dashboard" className="-m-1.5 p-1.5">
            <img className="h-8" src={logo} alt="Bubbles" />
          </a>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <ProfileMenu />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Bubbles;
