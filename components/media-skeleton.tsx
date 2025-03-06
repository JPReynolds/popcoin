import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function MediaSkeleton() {
  return (
    <div className="container mx-auto h-full flex items-center justify-center py-4 sm:py-6">
      <Card className="border-none shadow-none max-w-5xl w-full">
        <div className="flex flex-col md:flex-row h-full p-3 sm:p-4 gap-4">
          <div className="flex justify-center">
            <Skeleton className="w-[300px] h-[450px] rounded-lg" />
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
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
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-6 w-1/4 mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((item) => (
                      <Skeleton key={item} className="h-8 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
