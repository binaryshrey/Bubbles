/************************************************************ IMPORTS ************************************************************/

import { Skeleton } from '../../common/skeleton';

/************************************************************ IMPORTS ************************************************************/

const AnalyticsCardSkeleton = () => {
  return (
    <>
      <div className="w-full">
        <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5">
          <div className="flex flex-col xl:flex-row gap-8">
            <Skeleton className="h-64 w-full xl:w-44/100 mt-2 rounded-md" />
            <div className="flex flex-col justify-between gap-6">
              <div>
                <Skeleton className="h-2 w-[40px] mt-4" />
                <Skeleton className="h-2 w-[100px] mt-2" />
              </div>
              <div>
                <Skeleton className="h-2 w-[40px] mt-2" />
                <Skeleton className="h-2 w-[200px] mt-2" />
              </div>
              <div className="flex gap-4">
                <div>
                  <Skeleton className="h-2 w-[40px]" />
                  <Skeleton className="h-2 w-[40px] mt-2" />
                </div>
                <div>
                  <Skeleton className="h-2 w-[40px]" />
                  <Skeleton className="h-2 w-[20px] mt-2" />
                </div>
              </div>
              <div className="mb-1">
                <Skeleton className="h-2 w-[40px] mt-2" />
                <Skeleton className="h-2 w-[200px] mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsCardSkeleton;
