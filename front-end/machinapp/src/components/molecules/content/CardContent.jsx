export const CardDataStats = ({ title, total, children }) => {
  return (
    <div className="rounded-lg border border-green-400 bg-green-50 p-3 shadow-lg hover:shadow-xl hover:bg-green-100">
      <div className="flex h-12 cursor-pointer w-12 items-center justify-center rounded-full bg-green-500 dark:bg-green-700 transition-all duration-300 hover:bg-green-600 dark:hover:bg-green-800">
        {children}
      </div>

      <div className="mt-4 flex flex-col justify-between gap-2">
        <div>
          <h4 className="text-2xl font-bold">{total}</h4>
        </div>
        <div className="text-sm font-medium flex justify-between items-center w-full text-green-700 dark:text-green-300">
          <div>{title}</div>{" "}
          <div className="text-blue-500 cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 transition-colors duration-300">
            fg
          </div>
        </div>
      </div>
    </div>
  );
};
