import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Badge } from '@radix-ui/themes';
import { Input } from '../../common/input';
import { Label } from '../../common/label';
import { storage } from '../utils/Firebase';
import { Loader2, Copy } from 'lucide-react';
import { Button } from '../../common/button';
import { getFileType } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../../common/textarea';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '../../common/dialog';

const NewAlbum = () => {
  const albumID = uuidv4();
  const newAlbumURI = `https://bubbles-inc.vercel.app/albums/${albumID}`;

  const navigate = useNavigate();
  const LINK_EXPIRE_TIME = `${process.env.REACT_APP_BUBBLE_LINK_EXPIRE_TIME}mins`;
  const ALBUM_PICS_NO_LIMIT = process.env.REACT_APP_BUBBLE_ALBUM_PICS_NO_LIMIT;
  const ALBUM_PICS_SIZE_LIMIT = process.env.REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT * 1024 * 1024;

  const [copyToClipBoardConfirm, setCopyToClipBoardConfirm] = React.useState(false);
  const handleCopyToClipBoardConfirm = () => {
    setCopyToClipBoardConfirm(true);
  };

  const [showDialogURI, setShowDialogURI] = useState(false);
  const closeDialogURI = () => {
    setShowDialogURI(false);
    navigate('/dashboard');
  };
  const openDialogURI = () => {
    setShowDialogURI(true);
  };

  const [email, setEmail] = useState('');
  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    setEmail(emailID);
  }, []);

  const [albName, setAlbName] = useState('');
  const [albDesc, setAlbDesc] = useState('');
  const handleAlbNameChange = (event) => {
    setAlbName(event.target.value);
  };
  const handleAlbDescChange = (event) => {
    setAlbDesc(event.target.value);
  };

  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedFiles, setSelectedFiles] = useState([]);
  const removeSelectedFile = (fileName) => {
    return () => {
      setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };
  };
  const handleFileChange = (e) => {
    setError('');
    setSelectedFiles(Array.from(e.target.files));
    console.log(Array.from(e.target.files));
  };

  const handleNewAlbumPublish = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('selectedFiles.length', selectedFiles.length);
    console.log('ALBUM_PICS_NO_LIMIT', ALBUM_PICS_NO_LIMIT);

    // Check file count
    if (selectedFiles.length > ALBUM_PICS_NO_LIMIT) {
      setError(`You can only upload a maximum of ${ALBUM_PICS_NO_LIMIT} files.`);
      console.log(`You can only upload a maximum of ${ALBUM_PICS_NO_LIMIT} files.`);
      setLoading(false);
      return;
    }

    // Check file sizes
    for (let file of selectedFiles) {
      if (getFileType(file.name) !== 'Image') {
        setError(`File ${file.name} is not an image.`);
        console.error(`File ${file.name} is not an image.`);
        setLoading(false);
        return;
      }
    }

    //check file types
    // Check file sizes
    for (let file of selectedFiles) {
      if (file.size > ALBUM_PICS_SIZE_LIMIT) {
        setError(`File ${file.name} is too large. Maximum size is ${process.env.REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT} MB.`);
        console.error(`File ${file.name} is too large. Maximum size is ${process.env.REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT} MB.`);
        setLoading(false);
        return;
      }
    }

    if (selectedFiles.length === 0) {
      console.error('Please select a file to upload.');
      setError('Please select a file to upload.');
      setLoading(false);
      return;
    }

    // Create a promise for each file upload
    const uploadPromises = selectedFiles.map((file) => {
      // Create a metadata object
      const metadata = {
        contentType: file.type,
        customMetadata: {
          albumID: albumID,
          albumName: albName === '' ? 'Untitled Album' : albName,
          albumDescription: albDesc,
          albumAuthor: email,
          albumTimestamp: new Date(),
          albumTimestampMilli: Date.now(),
          albumTTEMilli: Date.now() + LINK_EXPIRE_TIME * 60 * 1000,
          albumURI: newAlbumURI,
        },
      };

      // Create a reference to the new folder 'images'
      const storageRef = ref(storage, `${albName}:${email}:${albumID}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Track progress for each file
      const progress = {};

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const fileProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          progress[file.name] = fileProgress;
          // setProgressPercent({ ...progress });
        },
        (error) => {
          setError(error.message);
          console.error(error.message);
          setLoading(false);
        },
        () => {
          // Handle successful uploads
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrls((prevUrls) => [...prevUrls, { name: file.name, url: downloadURL }]);
            setLoading(false);
            openDialogURI();
          });
        },
      );

      return uploadTask;
    });

    // Optionally: Wait for all uploads to complete
    Promise.all(uploadPromises)
      .then(() => {
        console.log('All files uploaded successfully');
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        handleCopyToClipBoardConfirm();
        console.log('Text copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="bg-black">
      <div className=" w-[90vw] max-w-[600px]">
        <p className="text-2xl text-white font-semibold">New Shared Album</p>
        <p className=" text-zinc-200 text-sm mt-2">Upload multiple photos to share a unique expirable link with your friends & family.</p>
        <div>
          <form className="mt-12">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 p-1">
                <Label htmlFor="albumName" className="text-white">
                  Album Name
                </Label>
                <Input id="albumName" placeholder="Name of your album" type="text" value={albName} onChange={handleAlbNameChange} maxLength="20" />
              </div>
              <div className="flex flex-col space-y-1.5 p-1">
                <Label htmlFor="albumDescription" className="text-white">
                  Album Description
                </Label>
                <Textarea id="albumDescription" placeholder="Description about your album" type="text" value={albDesc} onChange={handleAlbDescChange} maxLength="100" />
              </div>
              <div className="flex flex-col space-y-1.5 p-1">
                <Label htmlFor="albumExp" className="text-white">
                  Album Link Expiry
                </Label>
                <Input id="albumExp" disabled value={LINK_EXPIRE_TIME} />
              </div>
              <div className="flex flex-col space-y-1.5 p-1">
                <div className="flex gap-2 items-center">
                  <Label htmlFor="albumPhoto" className="text-white">
                    Album Photos
                  </Label>
                  <p className="text-xs text-zinc-500">(Max 7 - 5mb each)</p>
                </div>
                <Input id="albumPhoto" multiple type="file" onChange={handleFileChange} />
              </div>
            </div>
          </form>
          {error !== '' && <p className="text-xs text-rose-600 p-1">{error}</p>}

          <div className="grid gap-1 bg-black p-1">
            {selectedFiles.length > 0 && (
              <>
                <p className="text-xs text-zinc-500">Photos to be upload : Tap to remove</p>
                {selectedFiles.length > 0 &&
                  selectedFiles.map((file) => {
                    return (
                      <Badge key={file.name} onClick={removeSelectedFile(file.name)} className="cursor-pointer" color="orange">
                        {file.name} - {`${(file.size / 1024).toFixed(2)} KB`}
                      </Badge>
                    );
                  })}
              </>
            )}
          </div>
          {loading ? (
            <>
              <Button disabled type="submit" className="dark mt-8 ml-1 ">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publish
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" onClick={handleNewAlbumPublish} className="dark  mt-8 ml-1">
                Publish
              </Button>
              <Dialog open={showDialogURI} onOpenChange={setShowDialogURI}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-white">Share link</DialogTitle>
                    <DialogDescription className="text-zinc-600">Anyone who has this link will be able to view this.</DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input id="link" defaultValue={newAlbumURI} readOnly />
                    </div>
                    <Button type="submit" size="sm" className="px-3 dark" onClick={() => copyToClipboard(newAlbumURI)}>
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {copyToClipBoardConfirm && <p className="text-xs text-green-500">Link copied to clipboard!</p>}
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary" onClick={closeDialogURI}>
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAlbum;
