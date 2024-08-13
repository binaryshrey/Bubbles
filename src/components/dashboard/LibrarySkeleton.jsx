/************************************************************ IMPORTS ************************************************************/

import { Skeleton } from '../../common/skeleton';

/************************************************************ IMPORTS ************************************************************/

const LibrarySkeleton = () => {
  return (
    <>
      <div className="w-full xl:w-48/100">
        <div className="bg-black border border-zinc-700 rounded-md p-5">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-[150px]" />
              <Skeleton className="h-2 w-[200px]" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-2 w-[40px] mt-6 mb-6" />
            <Skeleton className="h-2 w-[40px] mt-6 mb-6" />
          </div>
          <Skeleton className="h-2 w-[100px] mb-2" />
          <Skeleton className="h-2 w-[150px]" />
        </div>
      </div>
    </>
  );
};

export default LibrarySkeleton;
