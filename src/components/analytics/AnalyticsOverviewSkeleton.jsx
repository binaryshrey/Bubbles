/************************************************************ IMPORTS ************************************************************/

import { Skeleton } from '../../common/skeleton';

/************************************************************ IMPORTS ************************************************************/

const AnalyticsOverviewSkeleton = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 justify-between">
      <div>
        <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 max-w-64">
          <div>
            <div className="flex justify-between gap-10">
              <div>
                <Skeleton className="h-2 w-[20px] mt-2" />
                <Skeleton className="h-2 w-[100px] mt-4" />
              </div>
              <div className="flex justify-center items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 max-w-64">
          <div>
            <div className="flex justify-between gap-10">
              <div>
                <Skeleton className="h-2 w-[20px] mt-2" />
                <Skeleton className="h-2 w-[100px] mt-4" />
              </div>
              <div className="flex justify-center items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 max-w-64">
          <div>
            <div className="flex justify-between gap-10">
              <div>
                <Skeleton className="h-2 w-[20px] mt-2" />
                <Skeleton className="h-2 w-[100px] mt-4" />
              </div>
              <div className="flex justify-center items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-zinc-950 border border-zinc-900 rounded-md p-5 max-w-64">
          <div>
            <div className="flex justify-between gap-10">
              <div>
                <Skeleton className="h-2 w-[20px] mt-2" />
                <Skeleton className="h-2 w-[100px] mt-4" />
              </div>
              <div className="flex justify-center items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverviewSkeleton;
