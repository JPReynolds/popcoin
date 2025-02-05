import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function MovieListSkeleton() {
  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {Array.from({ length: 9 }).map((_, i) => (
          <li key={i}>
            <Card>
              <CardHeader>
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-[200px]" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
