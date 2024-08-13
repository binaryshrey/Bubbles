import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../../common/input';
import { Button } from '../../common/button';
import SnackAlert from '../../common/SnackAlert';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../common/alert-dialog';

const Settings = () => {
  //state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackState, setSnackState] = useState('success');
  const [snackMessage, setSnackMessage] = useState('');
  const [email, setEmail] = useState('');

  // side-effects
  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    setEmail(emailID);
  }, []);

  // methods
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const deleteAlbums = async () => {
    try {
      const del_response = await axios.delete('https://bubbles-api-yn2d.onrender.com/delete-albums', {
        params: {
          user_email: email,
        },
      });
      setSnackMessage(del_response.data?.message);
      setSnackState('success');
    } catch (err) {
      setSnackMessage(err.message);
      setSnackState('error');
    } finally {
      handleSnackbarOpen();
    }
  };

  return (
    <div className="bg-black">
      <p className="text-white font-semibold text-xl md:text-2xl mb-4">Settings</p>
      <div className="flex flex-shrink-0 border-t border-zinc-800 mt-4 mb-4"></div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 w-full flex justify-between items-center">
        <p className="text-white text-sm">Bubbles Album Link Expiration Time</p>
        <Input id="link" defaultValue="5 mins" readOnly className="dark w-[76px]" />
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 w-full flex justify-between items-center mt-4">
        <p className="text-white text-sm">Delete My Albums With Associated Data</p>
        <AlertDialog className="dark">
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete your Bubbles albums and remove your data from our servers.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteAlbums}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <SnackAlert open={snackbarOpen} message={snackMessage} severity={snackState} onClose={handleSnackbarClose} />
    </div>
  );
};

export default Settings;
