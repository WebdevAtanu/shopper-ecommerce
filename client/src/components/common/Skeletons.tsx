import { Skeleton } from "@/components/ui/skeleton"


function Skeletons() {
	return (
		<div className="flex flex-col space-y-3 p-3">
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
	)
}

export default Skeletons