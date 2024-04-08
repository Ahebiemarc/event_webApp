import { Skeleton } from '@mui/material';

function SkeletonCard() {
  return (
    <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] md:py-[100px] relative">
      <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
        <div className="hidden md:block large-image">
          <Skeleton variant="rectangular" width={500} height={500} />
        </div>
      </div>

      <div className="description p-6 md:basis-1/2 md:py-[40px]">
        <Skeleton variant="text" width={100} height={30} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="text" width={300} height={50} />
      </div>
    </div>
  );
}

export default SkeletonCard;
