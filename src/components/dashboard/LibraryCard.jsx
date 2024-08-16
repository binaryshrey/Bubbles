/************************************************************ IMPORTS ************************************************************/

import loginBG from '../../assets/loginBG.webp';
import { Badge } from '@radix-ui/themes';
import { formatDate } from '../utils/utils';
import { Link } from 'react-router-dom';
import Timer from '../utils/Timer';
import { BASE_APP_URI } from '../utils/Constants';
import { getSecondsRemaining } from '../utils/utils';

/************************************************************ IMPORTS ************************************************************/

const LibraryCard = ({ album }) => {
  const albumLink = `${BASE_APP_URI}/albums/${album.link_id}`;
  const albumDisplayLink = `${BASE_APP_URI}/albums/${album.link_id.substring(0, 8)}...`;
  const albumDisplayLinkExpired = `${BASE_APP_URI}/albums/${album.link_id.substring(0, 18)}...`;
  const albumDisplayLinkMobile = `${BASE_APP_URI}/alb...`;
  const albumDisplayLinkExpiredMobile = `${BASE_APP_URI}/albums/...`;

  const openAlbum = (albumLink) => {
    window.open(albumLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="w-full xl:w-48/100 cursor-pointer ">
        <Link to="/analytics">
          <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 hover:bg-zinc-900">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img src={loginBG} alt="lib" className="w-10 h-10 object-cover rounded-full" />
                <div className="flex flex-col justify-center ">
                  <p className="text-sm text-white font-semibold">{album.album_name}</p>
                  <div href={albumLink} className="hover:underline text-zinc-500" onClick={openAlbum}>
                    <p className="text-xs block sm:hidden">{album.is_active ? albumDisplayLinkMobile : albumDisplayLinkExpiredMobile}</p>
                    <p className="text-xs hidden sm:block">{album.is_active ? albumDisplayLink : albumDisplayLinkExpired}</p>
                  </div>
                </div>
              </div>
              {album.is_active && <Timer timeRemaining={getSecondsRemaining(album?.created_at, 5)} albumName={album?.album_name} />}
            </div>
            <div className="flex gap-2">
              <Badge color="orange" className="mt-5 mb-5">
                Bubbles Album
              </Badge>
              {album.is_active ? (
                <Badge color="green" className="mt-5 mb-5">
                  • Live
                </Badge>
              ) : (
                <Badge color="red" className="mt-5 mb-5">
                  • Expired
                </Badge>
              )}
            </div>
            <p className="text-white text-xs text-zinc-500 mb-1">
              {album.album_photos?.length} Image(s) | {formatDate(album.created_at)}
            </p>
            <p className="text-white text-xs">Powered by Bubbles Inc.</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default LibraryCard;
