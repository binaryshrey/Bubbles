import React, { useRef, useState, useEffect } from 'react';
import loginBG from '../../../assets/loginBG.webp';
import { RiMoreLine } from '@remixicon/react';
import SnackAlert from '../../../common/SnackAlert';
import { Button } from '../../../common/button';
import { Badge } from '@radix-ui/themes';
import { fetchSavedAlbumFolders } from '../../utils/utils';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../common/alert-dialog';

const LibraryCard = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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

  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    fetchSavedAlbumFolders(emailID);
  }, []);

  return (
    <>
      <div className="w-2/5">
        <div className="bg-black border border-zinc-700 rounded-xl p-4">
          <div className="flex justify-between relative">
            <div className="flex gap-4">
              <img src={loginBG} alt="lib" className="w-8 h-8 object-cover rounded-full" />
              <div>
                <a href="/albums" className="hover:underline">
                  <p className="text-xs">SF Hiking Album</p>
                </a>
                <a href="/shared-albums" className="hover:underline text-zinc-500">
                  <p className="text-xs">https://bubbles-inc.vercel.app/</p>
                </a>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <Button onClick={toggleMenu} variant="outlineButton" size="icon" className="dark">
                <RiMoreLine className=" h-4 w-4 text-white" />
              </Button>
              <div>
                {showMenu && (
                  <div className="absolute right-0 z-10 w-40 origin-top-right rounded-md bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                      <AlertDialog>
                        <AlertDialogTrigger className="block px-4 py-2 text-sm text-white">Add to Archive</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Album Archive</AlertDialogTitle>
                            <AlertDialogDescription>{`Bubbles album auto-deletes in ${process.env.REACT_APP_BUBBLE_LINK_EXPIRE_TIME}mins. To archive this album, kindly subscribe to Bubbles PRO.`}</AlertDialogDescription>
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
                            <AlertDialogDescription>{`Bubbles album auto-deletes in ${process.env.REACT_APP_BUBBLE_LINK_EXPIRE_TIME}mins. To retain and mark this album as favorite, kindly subscribe to Bubbles PRO.`}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={favoriteAlbum}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger className="block px-4 py-2 text-sm text-rose-500">Delete Album</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Album</AlertDialogTitle>
                            <AlertDialogDescription>{`Bubbles album auto-deletes in ${process.env.REACT_APP_BUBBLE_LINK_EXPIRE_TIME}mins. Are you sure to delete this album now?`}</AlertDialogDescription>
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
          </div>
          <div className="flex gap-2">
            <Badge color="orange" className="mt-4 mb-4">
              Bubbles Album
            </Badge>
            <Badge color="orange" className="mt-4 mb-4">
              30mins
            </Badge>
          </div>
          <p className="text-white text-xs text-zinc-500 mb-1">5 images | 30mb</p>
          <p className="text-white text-xs">Powered by Bubbles Inc.</p>
        </div>
      </div>
      <SnackAlert open={snackbarOpen} message="Bubbles PRO coming soon!" severity="warning" onClose={handleSnackbarClose} />
    </>
  );
};

export default LibraryCard;
