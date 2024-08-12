import React from 'react';
import { Input } from '../../common/input';
import { Button } from '../../common/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../common/alert-dialog';

const Settings = () => {
  return (
    <div className="bg-black">
      <p className="text-white font-semibold text-xl md:text-2xl mb-4">Settings</p>
      <div className="flex flex-shrink-0 border-t border-zinc-800 mt-4 mb-4"></div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 w-full flex justify-between items-center">
        <p className="text-white text-sm">Bubbles Album Link Expiration Time</p>
        <Input id="link" defaultValue="5 mins" readOnly className="dark w-20" />
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
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Settings;
