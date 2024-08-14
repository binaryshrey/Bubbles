/************************************************************ IMPORTS ************************************************************/

import { RiEyeFill, RiTimeFill, RiPieChartFill, RiEarthFill } from '@remixicon/react';

/************************************************************ IMPORTS ************************************************************/

const features = [
  {
    name: 'View Once',
    description: 'With Bubbles, every photo album link can be viewed only once. Once your recipient has seen the image, the link becomes inaccessible, ensuring that your photos remain confidential.',
    icon: RiEyeFill,
  },
  {
    name: '5-Minute Links',
    description: ' Each link you create is available for just 5 minutes. This temporary access ensures that your photos are shared quickly and discreetly, giving you complete control over how long they remain accessible.',
    icon: RiTimeFill,
  },
  {
    name: 'Link Analytics',
    description: 'Stay informed with real-time insights. Our built-in analytics lets you track how many times your link was accessed, providing you with valuable info on your album’s reach and engagement.',
    icon: RiPieChartFill,
  },
  {
    name: 'Open Source',
    description: 'Transparency and community are at the heart of Bubbles. As an open-source project, we invite you to explore, contribute, and enhance the app. Our commitment to open source means you can trust in our integrity and be part of our evolving journey.',
    icon: RiEarthFill,
  },
];

const Features = () => {
  return (
    <div className="isolate bg-black/[0.96] antialiased bg-grid-white/[0.02] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:text-center">
          <h2 className="text-xl font-semibold leading-7 text-neutral-500">Share Images With Confidence</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-3xl">The ultimate photos sharing app with a twist</p>
          <p className="mt-6 text-sm sm:text-lg leading-8 text-neutral-500">
            Experience photo sharing like never before with Bubbles.
            <br /> Secure, temporary and fully transparent – the perfect way to share your moments with confidence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-zinc-400">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <feature.icon className="h-6 w-6 text-black" />
                  </div>
                  <p className="text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base leading-7 text-neutral-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
