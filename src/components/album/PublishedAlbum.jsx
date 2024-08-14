/************************************************************ IMPORTS ************************************************************/

import axios from 'axios';
import { useState, useEffect } from 'react';
import LayoutOne from './albumLayout/LayoutOne';
import LayoutTwo from './albumLayout/LayoutTwo';
import { Skeleton } from '../../common/skeleton';
import SnackAlert from '../../common/SnackAlert';
import LayoutThree from './albumLayout/LayoutThree';
import PageNotFound from '../not-found/PageNotFound';
import MasonryLayout from './albumLayout/MasonryLayout';
import { useParams, useLocation } from 'react-router-dom';

/************************************************************ IMPORTS ************************************************************/

const PublishedAlbum = () => {
  // global vars
  const { linkID } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get('ref');

  // state
  const [iP, setIP] = useState('');
  const [showAlbum, setShowAlbum] = useState(false);
  const [albumData, setAlbumData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // methods
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // side-effects
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const ip_response = await axios.get('https://api.ipify.org', {
          params: {
            format: 'json',
          },
        });

        const payload = {
          link_id: linkID,
          ip_address: ip_response.data?.ip,
        };

        const albumResponseURL = ref ? `https://bubbles-api-yn2d.onrender.com/check-view-permission?ref=${ref}` : 'https://bubbles-api-yn2d.onrender.com/check-view-permission';
        const album_response = await axios.put(albumResponseURL, payload);

        setShowAlbum(album_response.data?.message);
        setAlbumData(album_response.data?.contents);
        setIP(ip_response.data?.ip);
      } catch (err) {
        setError(err.message);
        handleSnackbarOpen();
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, []);

  return (
    <>
      <div className="bg-black h-screen">
        {loading && (
          <div className="bg-black pt-20 flex justify-center text-center">
            <Skeleton className="h-4 w-[160px]" />
          </div>
        )}
        {!loading && !showAlbum && <PageNotFound />}
        {!loading && showAlbum && (
          <>
            <div className="bg-black h-screen">
              {albumData?.album_photos?.length === 1 && <LayoutOne albumData={albumData} />}
              {albumData?.album_photos?.length === 2 && <LayoutTwo albumData={albumData} />}
              {albumData?.album_photos?.length === 3 && <LayoutThree albumData={albumData} />}
              {albumData?.album_photos?.length > 3 && <MasonryLayout albumData={albumData} />}
            </div>
          </>
        )}
        <SnackAlert open={snackbarOpen} message={error} severity="error" onClose={handleSnackbarClose} />
      </div>
    </>
  );
};

export default PublishedAlbum;
