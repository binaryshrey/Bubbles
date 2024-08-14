/************************************************************ IMPORTS ************************************************************/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import album from '../../assets/album_analytics.svg';
import live from '../../assets/live_analytics.svg';
import view from '../../assets/view_analytics.svg';
import twitter from '../../assets/twitter_analytics.svg';
import web from '../../assets/web_analytics.svg';
import whatsapp from '../../assets/whatsapp_analytics.svg';
import gmail from '../../assets/gmail_analytics.svg';
import fb from '../../assets/fb_analytics.svg';
import reddit from '../../assets/reddit_analytics.svg';
import telegram from '../../assets/telegram_analytics.svg';
import SnackAlert from '../../common/SnackAlert';
import AnalyticsOverviewSkeleton from './AnalyticsOverviewSkeleton';

/************************************************************ IMPORTS ************************************************************/

const AnalyticsOverview = () => {
  // state
  const [analytics, setAnalytics] = useState();
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

  const getTopTrafficIcon = (source) => {
    switch (source) {
      case 'twitter':
        return twitter;
      case 'whatsapp':
        return whatsapp;
      case 'gmail':
        return gmail;
      case 'fb':
        return fb;
      case 'reddit':
        return reddit;
      case 'telegram':
        return telegram;
      default:
        return web;
    }
  };

  useEffect(() => {
    const emailID = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email')) : '';
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get('https://bubbles-api-yn2d.onrender.com/analytics-overview', {
          params: {
            user_email: emailID,
          },
        });
        setAnalytics(response.data?.analytics);
      } catch (err) {
        setError(err.message);
        handleSnackbarOpen();
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();

    // poll every 5mins
    const intervalId = setInterval(fetchAnalytics, 300000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {loading && <AnalyticsOverviewSkeleton />}
      {!loading && (
        <>
          <div className="flex flex-col xl:flex-row gap-2 justify-between ">
            {/* total albums */}
            <div>
              <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 max-w-64 hover:bg-zinc-900">
                <div>
                  <div className="flex justify-between gap-10">
                    <div>
                      <p className="text-zinc-300 text-sm">{analytics?.total_albums}</p>
                      <p className="text-white text-md font-semibold mt-1">Total Albums</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <img src={album} alt="albums" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* live albums */}
            <div>
              <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5  max-w-64 hover:bg-zinc-900">
                <div>
                  <div className="flex justify-between gap-10">
                    <div>
                      <p className="text-zinc-300 text-sm">{analytics?.live_albums}</p>
                      <p className="text-white text-md font-semibold mt-1">Live Albums</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <img src={live} alt="albums" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* total views */}
            <div>
              <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 max-w-64 hover:bg-zinc-900">
                <div>
                  <div className="flex justify-between gap-10">
                    <div>
                      <p className="text-zinc-300 text-sm">{analytics?.total_album_views}</p>
                      <p className="text-white text-md font-semibold mt-1">Total Views</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <img src={view} alt="albums" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* top source */}
            <div>
              <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5  max-w-64 hover:bg-zinc-900">
                <div>
                  <div className="flex justify-between gap-10">
                    <div>
                      <p className="text-zinc-300 text-sm">{analytics?.top_traffic_source}</p>
                      <p className="text-white text-md font-semibold mt-1">Top Traffic Source</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <img src={getTopTrafficIcon(analytics?.top_traffic_source)} alt="albums" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SnackAlert open={snackbarOpen} message={error} severity="error" onClose={handleSnackbarClose} />
          </div>
        </>
      )}
    </>
  );
};

export default AnalyticsOverview;
