/************************************************************ IMPORTS ************************************************************/

import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { Input } from '../../common/input';
import { Label } from '../../common/label';
import { Button } from '.././../common/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '../../common/dialog';

/************************************************************ IMPORTS ************************************************************/

const ShareAlbum = ({ showDialogURI, setShowDialogURI, LINK_EXPIRE_TIME, albumURI, copyToClipBoardConfirm, closeDialogURI, copyToClipboard }) => {
  // state
  const [timeLeft, setTimeLeft] = useState(LINK_EXPIRE_TIME * 60);

  // side-effects
  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // methods
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} mins`;
  };

  return (
    <Dialog open={showDialogURI} onOpenChange={setShowDialogURI}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Share link</DialogTitle>
          <DialogDescription className="text-zinc-600">Anyone who has this link will be able to view this album for the next {formatTime(timeLeft)}!</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={albumURI} readOnly className="dark" />
          </div>
          <Button type="submit" size="sm" className="px-3 dark" onClick={() => copyToClipboard(albumURI)}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        {copyToClipBoardConfirm && <p className="text-xs text-green-500">Link copied to clipboard!</p>}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={closeDialogURI}>
              Go To Dashboard
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareAlbum;
