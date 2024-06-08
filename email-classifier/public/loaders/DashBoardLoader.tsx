import { EmailMessageLoader } from "./EmailMessageLoader";

export default function DashBoardLoader() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="bg-gray-900 min-h-screen p-8 animate-pulse px-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-700"></div>
          <div>
            <div className="h-4 bg-gray-700 w-3/4 rounded"></div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 border bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-10 px-4 py-2 text-white border-white"></div>
      </div>
      <div className="flex items-center justify-between mb-6 mt-20">
        <div className="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800 w-14 cursor-pointer"></div>
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 border bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-10 px-4 py-2 text-white border-white"></div>
      </div>
      <div className="space-y-4">
        <EmailMessageLoader />
      </div>
    </div>
  );
}
