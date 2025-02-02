import { Skeleton } from "@/components/ui/skeleton";

export function CardsSkeleton() {
  return (
    <div className="mt-6 flex items-center justify-center flex-wrap gap-4 bg-slate-300 p-4 lg:w-[1024px]">
      {[1, 1, 1, 1, 1, 1, 1, 1].map((_, index: number) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
