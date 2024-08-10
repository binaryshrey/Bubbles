import React, { useRef, useState, useEffect } from 'react';
import loginBG from '../../assets/loginBG.webp';
import { Badge } from '@radix-ui/themes';
import { formatDate } from '../utils/utils';
import { Link } from 'react-router-dom';

const LibraryCard = ({ album }) => {
  const albumLink = `https://bubbles-inc.vercel.app/albums/${album.link_id}`;
  const albumDisplayLink = `https://bubbles-inc.vercel.app/albums/${album.link_id.substring(0, 4)}...`;

  const openAlbum = (albumLink) => {
    window.open(albumLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="w-2/5 cursor-pointer">
        <Link to="/shared-albums">
          <div className="bg-black border border-zinc-700 rounded-md p-5">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img src={loginBG} alt="lib" className="w-10 h-10 object-cover rounded-full" />
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-white font-semibold">{album.album_name}</p>
                  <div href={albumLink} className="hover:underline text-zinc-500" onClick={openAlbum}>
                    <p className="text-xs">{albumDisplayLink}</p>
                  </div>
                </div>
              </div>
              <img src={loginBG} alt="lib" className="w-10 h-10 object-cover rounded-full" />
            </div>
            <div className="flex gap-2">
              <Badge color="orange" className="mt-5 mb-5">
                Bubbles Album
              </Badge>
              {album.is_active ? (
                <Badge color="lime" className="mt-5 mb-5">
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
