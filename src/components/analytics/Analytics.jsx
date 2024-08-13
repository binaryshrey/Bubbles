/************************************************************ IMPORTS ************************************************************/

import AnalyticsOverview from './AnalyticsOverview';
import AlbumAnalytics from './AlbumAnalytics';

/************************************************************ IMPORTS ************************************************************/

const Analytics = () => {
  return (
    <div className="bg-black">
      <p className="text-white font-semibold text-xl md:text-2xl mb-4">Overview</p>
      <AnalyticsOverview />
      <div className="flex flex-shrink-0 border-t border-zinc-800 mt-4 mb-4"></div>
      <p className="text-white font-semibold text-xl md:text-2xl mt-4 mb-4">Albums</p>
      <AlbumAnalytics />
    </div>
  );
};

export default Analytics;
