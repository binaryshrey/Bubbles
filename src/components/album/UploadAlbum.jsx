/************************************************************ IMPORTS ************************************************************/

import React, { useState, useRef } from 'react';
import '../../styles/uploadAlbum.css';
import { Input } from '../../common/input';
import { getFileType } from '../utils/utils';
import logo from '../../assets/logo-light.svg';
import ProfileMenu from '../utils/ProfileMenu';
import { Button } from '.././../common/button';
import SnackAlert from '../../common/SnackAlert';
import { RiPencilFill, RiUploadCloud2Line, RiAddLargeFill, RiDeleteBin4Fill } from '@remixicon/react';

/************************************************************ IMPORTS ************************************************************/

const UploadAlbum = () => {
  // global vars
  const fileInputRef = useRef(null);
  const ALBUM_PICS_SIZE_LIMIT = process.env.REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT * 1024 * 1024;

  // state
  const [email, setEmail] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumFiles, setAlbumFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackAlertMessage, setSnackAlertMessage] = useState('');

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

  const handlePublish = () => {
    console.log(albumFiles);
  };

  // side-effects
  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    setEmail(emailID);
  }, []);

  const uploadBoxSmall = () => {
    return (
      <div onClick={handleInputFileRef} className="border-2 border-dashed rounded border-zinc-700 bg-neutral-900 w-36 h-36 flex justify-center items-center cursor-pointer">
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
            <div className="w-16 h-16 bg-black rounded-md flex justify-center items-center drop-shadow-md">
              <RiUploadCloud2Line className="h-6 w-6 text-white" />
            </div>
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
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
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

        <div className="mt-12 text-center">
          <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Bubbles</h1>
          <p className="mt-1 text-sm text-neutral-300">Share Magical Moments That Pops In 5mins</p>
        </div>

        <div className="max-w-4xl mx-auto px-36">
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
            <div className="mt-8 flex flex-wrap gap-2.5">
              {albumFiles.map((file, index) => {
                return (
                  <div key={index} className="flex justify-between relative">
                    <img src={URL.createObjectURL(file)} alt="pic" className="w-36 h-36 rounded border-2 border-zinc-800 p-4 object-fill" />
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

          <div className="flex justify-end">
            {albumFiles.length === 0 && (
              <div className={albumFiles.length === 0 ? `mt-36` : `mt-24`}>
                <Button className="dark" disabled onClick={handlePublish}>
                  Publish
                </Button>
              </div>
            )}
            {albumFiles.length !== 0 && (
              <div className={albumFiles.length === 0 ? `mt-36` : `mt-24`}>
                <Button className="dark" onClick={handlePublish}>
                  Publish
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <SnackAlert open={snackbarOpen} message={snackAlertMessage} severity="error" onClose={handleSnackbarClose} />
    </div>
  );
};

export default UploadAlbum;
