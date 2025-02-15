import { Suspense } from "react";
import { MediaSkeleton } from "@/components/media-skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <Suspense fallback={<MediaSkeleton />}>{children}</Suspense>
    </div>
  );
}
