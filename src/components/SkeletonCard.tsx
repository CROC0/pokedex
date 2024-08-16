import { Skeleton } from "./ui/skeleton";

function SkeletonCard() {
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden">
      <div className="aspect-square flex items-center justify-center bg-muted/20 p-4">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
}
export default SkeletonCard;
