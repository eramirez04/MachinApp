export const CardDataStats = ({ title, total, children, link }) => {
  return (
    <div className="rounded-lg border border-green-400 bg-green-50 p-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-green-100 dark:bg-green-800 dark:border-green-700 dark:hover:bg-green-700">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 dark:bg-green-600 text-white shadow-md transition-all duration-300 hover:bg-green-600 dark:hover:bg-green-700">
        {children}
      </div>

      <div className="mt-4 flex flex-col justify-between gap-1">
        <div>
          <h4 className="text-xl font-bold text-green-800 dark:text-green-200">
            {total}
          </h4>
        </div>
        <div className="text-sm font-medium flex justify-between items-center text-green-700 dark:text-green-300">
          <div>{title}</div>
          <div className="text-blue-500 cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 transition-colors duration-300">
            {link}
          </div>
        </div>
      </div>
    </div>
  );
};
