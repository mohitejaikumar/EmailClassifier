export const EmailMessageLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((item, index) => {
        return (
          <div className="rounded-lg text-card-foreground shadow-sm bg-gray-800 border border-white animate-pulse">
            <div className="flex-col space-y-1.5 p-6 flex justify-between">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-white w-1/2 rounded"></div>
                <div className="h-6 bg-white w-1/2 rounded"></div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="h-4 bg-white w-full rounded"></div>
            </div>
            <div className="p-6 pt-0">
              <div className="h-4 bg-white w-full rounded"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};
