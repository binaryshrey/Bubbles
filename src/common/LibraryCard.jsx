import React, { useRef, useState, useEffect } from 'react';
import loginBG from '../assets/loginBG.webp';
import { RiMore2Line } from '@remixicon/react';
import SnackAlert from '../common/SnackAlert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../common/alert-dialog';

const LibraryCard = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  const shareAlbum = () => {
    console.log('Share Album');
    closeMenu();
  };

  const deleteAlbum = () => {
    console.log('Delete Album');
    handleSnackbarOpen();
    closeMenu();
  };

  const favoriteAlbum = () => {
    console.log('Favorite Album');
    handleSnackbarOpen();
    closeMenu();
  };

  const archiveAlbum = () => {
    console.log('Archive Album');
    handleSnackbarOpen();
    closeMenu();
  };

  return (
    <>
      <div className="w-80 cursor-pointer">
        <div className="bg-zinc-800 relative rounded-xl">
          <img src={loginBG} alt="lib" className="w-full h-52 object-cover p-4 rounded-3xl" />
          <div className="absolute top-0 right-0 p-4">
            <button onClick={toggleMenu} className="bg-transparent border border-white py-1 px-1 rounded flex items-center m-2">
              <RiMore2Line className=" flex-shrink-0 h-4 w-4 text-white" />
            </button>
            {showMenu && (
              <div className="absolute right-0 z-10 w-40 origin-top-right rounded-md bg-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                  <AlertDialog>
                    <AlertDialogTrigger className="block px-4 py-2 text-sm text-white">Add to Archive</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Album Archive</AlertDialogTitle>
                        <AlertDialogDescription>Bubbles album auto-deletes in 5mins. To archive this album, kindly subscribe to Bubbles PRO.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={archiveAlbum}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger className="block px-4 py-2 text-sm text-white">Mark as Favorite</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Favorite Album</AlertDialogTitle>
                        <AlertDialogDescription>Bubbles album auto-deletes in 5mins. To retain and mark this album as favorite, kindly subscribe to Bubbles PRO.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={favoriteAlbum}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger className="block px-4 py-2 text-sm text-rose-400">Delete Album</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Album</AlertDialogTitle>
                        <AlertDialogDescription>Bubbles album auto-deletes in 5mins. Are you sure to delete this album now?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteAlbum}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-1 items-center">
          <p className="text-white text-sm mt-2 ">SF Meetup</p>
          <p className="text-neutral-500 text-xs mt-2"> 5 images | 30mb</p>
        </div>
      </div>
      <SnackAlert open={snackbarOpen} message="Bubbles PRO coming soon!" severity="warning" onClose={handleSnackbarClose} />
    </>
  );
};

export default LibraryCard;
