import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function MediaListSkeleton() {
  return (
    <div className="flex justify-center flex-1">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {Array.from({ length: 9 }).map((_, i) => (
          <li key={i}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full aspect-[2/3]" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
