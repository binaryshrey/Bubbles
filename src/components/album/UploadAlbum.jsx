/************************************************************ IMPORTS ************************************************************/

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ShareAlbum from './ShareAlbum';
import '../../styles/uploadAlbum.css';
import { Input } from '../../common/input';
import upload from '../../assets/upload.svg';
import { storage } from '../utils/Firebase';
import { Loader2, Copy } from 'lucide-react';
import { getFileType } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-light.svg';
import ProfileMenu from '../utils/ProfileMenu';
import { Button } from '.././../common/button';
import { UserAuth } from '../hooks/AuthContext';
import SnackAlert from '../../common/SnackAlert';
import { getAlbumPublishDate } from '../utils/utils';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { RiPencilFill, RiAddLargeFill, RiDeleteBin4Fill } from '@remixicon/react';

/************************************************************ IMPORTS ************************************************************/

const UploadAlbum = () => {
  // global vars
  const { user } = UserAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const LINK_EXPIRE_TIME = `${process.env.REACT_APP_BUBBLE_LINK_EXPIRE_TIME}mins`;
  const ALBUM_PICS_SIZE_LIMIT = process.env.REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT * 1024 * 1024;

  // state
  const [email, setEmail] = useState('');
  const [albumID, setAlbumID] = useState('');
  const [albumURI, setAlbumURI] = useState('');
  const [loading, setLoading] = useState(false);
  const [albumName, setAlbumName] = useState('');
  const [albumFiles, setAlbumFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showDialogURI, setShowDialogURI] = useState(false);
  const [snackAlertMessage, setSnackAlertMessage] = useState('');
  const [copyToClipBoardConfirm, setCopyToClipBoardConfirm] = useState(false);

  // methods
  const handleAlbumNameChange = (event) => {
    setAlbumName(event.target.value);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputFileRef = () => {
    fileInputRef.current.click();
  };

  const closeDialogURI = () => {
    setShowDialogURI(false);
    navigate('/dashboard');
  };

  const openDialogURI = () => {
    setShowDialogURI(true);
  };

  const handleCopyToClipBoardConfirm = () => {
    setCopyToClipBoardConfirm(true);
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

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file && getFileType(file.name) !== 'Image') {
      setSnackAlertMessage('Only images are allowed!');
      console.error(`Only images are allowed!`);
      handleSnackbarOpen();
      return;
    } else if (file && file.size > ALBUM_PICS_SIZE_LIMIT) {
      setSnackAlertMessage(`File ${file.name} is too large. Max size is ${process.env.REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT} MB.`);
      console.error(`File ${file.name} is too large. Max size is ${process.env.REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT} MB.`);
      handleSnackbarOpen();
      return;
    } else {
      if (file) {
        setAlbumFiles([...albumFiles, file]);
      }
    }
  };

  const handleRemoveImage = (file) => {
    setAlbumFiles(albumFiles.filter((albumFile) => albumFile.name !== file.name));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setSnackAlertMessage('');
    setLoading(true);
    setCopyToClipBoardConfirm(false);

    const publishAlbumID = uuidv4();
    setAlbumID(publishAlbumID);
    setAlbumURI(`https://bubbles-inc.vercel.app/albums/${publishAlbumID}`);

    try {
      const uploadPromises = albumFiles.map((file) => {
        // Create a metadata object
        const metadata = {
          contentType: file.type,
          customMetadata: {
            albumID: publishAlbumID,
            albumURI: `https://bubbles-inc.vercel.app/albums/${publishAlbumID}`,
            albumAuthor: email,
            albumName: albumName === '' ? 'Untitled Album' : albumName,
            albumCreatedAt: getAlbumPublishDate(),
          },
        };

        // Create a reference to the new folder 'images'
        const storageRef = ref(storage, `${email}:${publishAlbumID}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Track progress for each file
        const progress = {};

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const fileProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              progress[file.name] = fileProgress;
              // setProgressPercent({ ...progress });
            },
            (error) => {
              console.error(error.message);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURI) => {
                  resolve(downloadURI);
                })
                .catch(reject);
            },
          );
        });
      });

      // Wait for all file uploads to complete
      const albumImageURIs = await Promise.all(uploadPromises);

      // Save to SupaDB via POST request
      const payload = {
        link_id: publishAlbumID,
        user_id: user.uid,
        user_email: email,
        album_id: `${email}:${publishAlbumID}`,
        album_name: albumName === '' ? 'Untitled Album' : albumName,
        album_photos: albumImageURIs,
        created_at: getAlbumPublishDate(),
      };
      console.log('Payload:', payload);
      await axios.post('https://bubbles-api-yn2d.onrender.com/add-link', payload);

      setLoading(false);
      setSnackAlertMessage('');
      console.log('All files uploaded successfully');
      openDialogURI();
    } catch (error) {
      setSnackAlertMessage(error.message);
      setLoading(false);
      handleSnackbarOpen();
      console.error('Error uploading files:', error);
    }
  };

  // side-effects
  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    setEmail(emailID);
  }, []);

  const uploadBoxSmall = () => {
    return (
      <div onClick={handleInputFileRef} className="border-2 border-dashed rounded border-zinc-700 bg-neutral-900 w-40 h-40 md:w-36 md:h-36 flex justify-center items-center cursor-pointer">
        <div className="w-12 h-12 bg-black rounded-md flex justify-center items-center drop-shadow-md">
          <RiAddLargeFill className="h-6 w-6 text-white" />
        </div>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      </div>
    );
  };

  const uploadBoxLarge = () => {
    return (
      <div className="mt-8 cursor-pointer" onClick={handleInputFileRef}>
        <div className="border-2 border-dashed rounded border-zinc-700 w-full h-64 bg-neutral-900 flex justify-center text-center">
          <div className="flex flex-col justify-center items-center">
            <img src={upload} alt="upload" />
            <p className="text-neutral-300 text-md mt-4">Tap to upload your Image</p>
            <p className="text-neutral-600 text-xs">Supports: PNG, JPEG, JPG, WEBP (5 mb max)</p>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black h-screen relative">
      {/* bubbles animaation */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <div className="bubble bubble--1"></div>
        <div className="bubble bubble--2"></div>
        <div className="bubble bubble--3"></div>
        <div className="bubble bubble--4"></div>
        <div className="bubble bubble--5"></div>
        <div className="bubble bubble--6"></div>
        <div className="bubble bubble--7"></div>
        <div className="bubble bubble--8"></div>
        <div className="bubble bubble--9"></div>
        <div className="bubble bubble--10"></div>
        <div className="bubble bubble--11"></div>
        <div className="bubble bubble--12"></div>
      </div>

      {/* content */}
      <div className="relative z-10 ">
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

        <div>
          <div className="mt-12 text-center">
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Bubbles</h1>
            <p className="mt-1 text-xs md:text-sm text-neutral-300">Share Magical Moments That Pops In 5mins</p>
          </div>

          <div className="max-w-4xl mx-auto md:px-36 px-8">
            <div className="mt-12">
              <div className="flex justify-between relative">
                <Input id="albumName" placeholder="Album Name" type="text" className="dark" value={albumName} onChange={handleAlbumNameChange} maxLength="20" />
                <div className="absolute top-0 right-0">
                  <div className="p-1 bg-zinc-800 rounded-md -m-2">
                    <RiPencilFill className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* First File upload */}
            {albumFiles.length === 0 && uploadBoxLarge()}

            {/* Multiple file upload */}
            {albumFiles.length !== 0 && (
              <div className="mt-8 flex flex-wrap gap-6 md:gap-2.5">
                {albumFiles.map((file, index) => {
                  return (
                    <div key={index} className="flex justify-between relative">
                      <img src={URL.createObjectURL(file)} alt="pic" className="w-40 h-40 md:w-36 md:h-36 rounded border-2 border-zinc-800 p-2 object-fill" />
                      <div className="absolute top-0 right-0 cursor-pointer" onClick={() => handleRemoveImage(file)}>
                        <div className="p-1 bg-zinc-800 rounded-md -m-2">
                          <RiDeleteBin4Fill className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {albumFiles.length < 8 && uploadBoxSmall()}
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto md:px-36 px-8 pb-4">
            <div className="flex justify-end">
              {albumFiles.length === 0 && !loading && (
                <div className={albumFiles.length === 0 ? `mt-36` : `mt-24`}>
                  <Button type="submit" className="dark" disabled>
                    Publish
                  </Button>
                </div>
              )}
              {albumFiles.length !== 0 && loading && (
                <div className={albumFiles.length === 0 ? `mt-36` : `mt-24`}>
                  <Button type="submit" className="dark" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publish
                  </Button>
                </div>
              )}
              {albumFiles.length !== 0 && !loading && (
                <div className={albumFiles.length === 0 ? `mt-36` : `mt-24`}>
                  <Button type="submit" className="dark" onClick={handlePublish}>
                    Publish
                  </Button>
                  {showDialogURI && <ShareAlbum showDialogURI={showDialogURI} setShowDialogURI={setShowDialogURI} LINK_EXPIRE_TIME={process.env.REACT_APP_BUBBLE_LINK_EXPIRE_TIME} albumURI={albumURI} copyToClipBoardConfirm={copyToClipBoardConfirm} closeDialogURI={closeDialogURI} copyToClipboard={copyToClipboard} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SnackAlert open={snackbarOpen} message={snackAlertMessage} severity="error" onClose={handleSnackbarClose} />
    </div>
  );
};

export default UploadAlbum;
