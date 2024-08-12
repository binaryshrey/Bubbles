/************************************************************ IMPORTS ************************************************************/

import axios from 'axios';
import Lottie from 'react-lottie';
import AlbumAnalyticsCard from './AlbumAnalyticsCard';
import empty from '../../assets/empty.json';
import SnackAlert from '../../common/SnackAlert';
import React, { useState, useEffect } from 'react';
import AnalyticsCardSkeleton from './AnalyticsCardSkeleton';

/************************************************************ IMPORTS ************************************************************/

const AlbumAnalytics = () => {
  //global vars
  const lottieConfig = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // state
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // methods
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // side-effects
  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get('https://bubbles-api-yn2d.onrender.com/get-albums/', {
          params: {
            user_email: emailID,
          },
        });
        console.log(response.data);
        setAlbums(response.data?.albums?.reverse());
      } catch (err) {
        setError(err.message);
        handleSnackbarOpen();
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();

    // poll every 5mins
    const intervalId = setInterval(fetchAlbums, 300000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {loading && (
        <div className="flex flex-col gap-8">
          <AnalyticsCardSkeleton />
          <AnalyticsCardSkeleton />
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
            <AlbumAnalyticsCard key={album.album_id} album={album} />
          ))}
        </div>
      )}
      <SnackAlert open={snackbarOpen} message={error} severity="error" onClose={handleSnackbarClose} />
    </>
  );
};

export default AlbumAnalytics;
