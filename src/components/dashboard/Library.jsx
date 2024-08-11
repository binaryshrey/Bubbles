import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryCard from './LibraryCard';
import Lottie from 'react-lottie';
import empty from '../../assets/empty.json';
import SnackAlert from '../../common/SnackAlert';
import LibrarySkeleton from './LibrarySkeleton';

const Library = () => {
  const lottieConfig = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [albums, setAlbums] = useState([]);
  const [albumsExpiring, setAlbumsExpiring] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError('null');

        const response = await axios.get('https://bubbles-api-yn2d.onrender.com/get-albums/', {
          params: {
            user_email: emailID,
          },
        });
        console.log(response.data);
        setAlbums(response.data?.albums?.reverse());
        setAlbumsExpiring(response.data?.albums_expiring);
      } catch (err) {
        setError(err.message);
        handleSnackbarOpen();
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();

    // poll every 3mins
    const intervalId = setInterval(fetchAlbums, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {loading && (
        <div className="flex gap-4 flex-wrap">
          <LibrarySkeleton />
          <LibrarySkeleton />
        </div>
      )}
      {!loading && albums?.length === 0 && (
        <div className="mt-20 flex flex-col justify-center items-center text-center">
          <Lottie options={lottieConfig} height={140} width={140} />
          <p className="text-white text-xs -mt-4">You don't have any albums yet!</p>
        </div>
      )}
      {!loading && albums?.length > 0 && (
        <div className="flex justify-between gap-4 xl:gap-10 flex-wrap">
          {albums.map((album) => (
            <LibraryCard key={album.album_id} album={album} />
          ))}
        </div>
      )}
      {!loading && albumsExpiring?.length > 0 && (
        <>
          {albumsExpiring.map((album, index) => (
            <SnackAlert key={index} open={true} message={`${album.album_name} album link is about to expire!`} severity="warning" onClose={handleSnackbarClose} />
          ))}
        </>
      )}
      <SnackAlert open={snackbarOpen} message={error} severity="error" onClose={handleSnackbarClose} />
    </>
  );
};

export default Library;