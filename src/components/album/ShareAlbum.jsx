/************************************************************ IMPORTS ************************************************************/

import React, { useState, useEffect, memo } from 'react';
import { Copy } from 'lucide-react';
import { Input } from '../../common/input';
import { Label } from '../../common/label';
import { Button } from '.././../common/button';
import telegram from '../../assets/telegram.png';
import reddit from '../../assets/reddit.png';
import fb from '../../assets/fb.png';
import gmail from '../../assets/gmail.png';
import twitter from '../../assets/twitter.png';
import whatsapp from '../../assets/whatsapp.png';
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton, TelegramShareButton, RedditShareButton, EmailShareButton } from 'react-share';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '../../common/dialog';

/************************************************************ IMPORTS ************************************************************/

const ShareAlbum = ({ showDialogURI, setShowDialogURI, LINK_EXPIRE_TIME, albumURI, copyToClipBoardConfirm, closeDialogURI, copyToClipboard }) => {
  // state
  const [timeLeft, setTimeLeft] = useState(LINK_EXPIRE_TIME * 60);
  const shareContent = `Hey! Check out my new Bubbles album :\n${albumURI}`;

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
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}mins`;
  };

  return (
    <Dialog open={showDialogURI} onOpenChange={setShowDialogURI}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Share link</DialogTitle>
          <DialogDescription className="text-zinc-600">Anyone who has this link can view the album for the next {formatTime(timeLeft)}!</DialogDescription>
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
        <div className="flex justify-between">
          <TelegramShareButton url={`${shareContent}?ref=telegram`}>
            <img src={telegram} alt="telegram" className="w-12 h-12 rounded" />
          </TelegramShareButton>
          <EmailShareButton url={`${shareContent}?ref=gmail`}>
            <img src={gmail} alt="gmail" className="w-12 h-12 rounded" />
          </EmailShareButton>
          <FacebookShareButton url={`${shareContent}?ref=fb`}>
            <img src={fb} alt="fb" className="w-12 h-12 rounded" />
          </FacebookShareButton>
          <RedditShareButton url={`${shareContent}?ref=reddit`}>
            <img src={reddit} alt="reddit" className="w-12 h-12 rounded" />
          </RedditShareButton>
          <TwitterShareButton url={`${shareContent}?ref=twitter`}>
            <img src={twitter} alt="twitter" className="w-12 h-12 rounded" />
          </TwitterShareButton>
          <WhatsappShareButton url={`${shareContent}?ref=whatsapp`}>
            <img src={whatsapp} alt="whatsapp" className="w-12 h-12 rounded" />
          </WhatsappShareButton>
        </div>
        {copyToClipBoardConfirm && <p className="text-xs text-green-500">Link copied to clipboard!</p>}
        <DialogClose asChild>
          <Button type="button" variant="default" className="dark" onClick={closeDialogURI}>
            Go To Dashboard
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ShareAlbum);
