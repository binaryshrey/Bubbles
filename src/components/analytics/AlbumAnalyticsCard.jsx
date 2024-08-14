/************************************************************ IMPORTS ************************************************************/

import { Badge } from '@radix-ui/themes';
import { formatDate } from '../utils/utils';
import { UserAuth } from '../hooks/AuthContext';
import { Link } from 'react-router-dom';
import AnalyticsChart from './AnalyticsChart';

/************************************************************ IMPORTS ************************************************************/

const AlbumAnalyticsCard = ({ album }) => {
  const { user } = UserAuth();
  const albumLink = `https://bubbles-inc.vercel.app/albums/${album.link_id}`;

  return (
    <>
      <div className="w-full">
        <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 hover:bg-zinc-900">
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="w-full xl:w-44/100 h-64">
              <div className=" bg-black border border-zinc-800 rounded-md">
                <p className="m-4 ml-4 text-white text-xs">Traffic Source(s)</p>
                <AnalyticsChart analyticsData={album?.analytics} />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div>
                <p className="text-zinc-500 text-sm">Name</p>
                <p className="text-white text-sm">{album?.album_name}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Link</p>
                <Link to={albumLink} target="_blank" rel="noopener noreferrer">
                  <p className="text-white text-sm hover:underline">{albumLink}</p>
                </Link>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-zinc-500 text-sm ">Status</p>
                  {album?.is_active ? <Badge color="green">• Live</Badge> : <Badge color="red">• Expired</Badge>}
                </div>
                <div>
                  <p className="text-zinc-500 text-sm ">Total Views</p>
                  <p className="text-white text-sm ml-8">{album?.viewed_by?.length}</p>
                </div>
              </div>
              <div className="mb-1">
                <p className="text-zinc-500 text-sm">Created</p>
                <p className="text-white text-sm">{`${formatDate(album.created_at)} by ${user.displayName}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumAnalyticsCard;
