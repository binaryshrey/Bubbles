import album_analytics from '../../assets/album_analytics.png';

const FeaturesAnalytics = () => {
  return (
    <div className="bg-black/[0.96] antialiased bg-grid-white/[0.02] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-3xl font-semibold leading-8 tracking-tight text-white">Stay informed with real-time insights.</h2>
          <p className="mt-2 text-lg leading-8 text-neutral-500">Keep track of your album's engagement rate with our built-in analytics.</p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img src={album_analytics} alt="App analytics" className="rounded-xl shadow-2xl ring-1 ring-gray-900/10" width={1440} height={810} />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-black/[0.96] pt-[7%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesAnalytics;
