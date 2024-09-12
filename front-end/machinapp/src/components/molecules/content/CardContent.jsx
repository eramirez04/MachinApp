export const CardDataStats = ({ title, total, period, change, link }) => {
  const isPositive = change > 0;
  return (
    <div className=" bg-white rounded-lg shadow p-4 flex gap-3 items-center">
      <div className="h-3/4 rounded bg-orange-500 w-2"></div>
      <div className="rounded-lg border w-full border-green-400  p-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-green-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full  text-white shadow-md transition-all duration-300 hover:bg-green-600 "></div>
        <div className="mt-4 flex flex-col justify-between gap-1">
          <div>
            <h4 className="text-xl font-bold text-green-800 dark:text-green-200">
              {total.toLocaleString()}
            </h4>
          </div>
          <div className="text-sm font-medium flex justify-between items-center text-green-700 dark:text-green-300">
            <div>{title}</div>
            <div className="text-blue-500 cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 transition-colors duration-300">
              {link}
            </div>
          </div>
        </div>
        <div
          className={`text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}% since {period}
        </div>
      </div>{" "}
    </div>
  );
};
