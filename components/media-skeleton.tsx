import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function MediaSkeleton() {
  return (
    <div className="container mx-auto py-8 flex-1 flex flex-col">
      <Card className="flex-1 border-none shadow-none">
        <div className="flex flex-col md:flex-row h-full p-6 gap-6">
          <div className="flex justify-center">
            <Skeleton className="w-[300px] h-[500px] rounded-lg" />
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>

              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>

              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>

              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-1/4" />
                <div className="flex space-x-2">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-8 w-20 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
