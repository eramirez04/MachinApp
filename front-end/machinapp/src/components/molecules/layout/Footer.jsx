export const Footer = () => {
  let hoy = new Date();
  let ahora = hoy.toLocaleDateString();
  const ID = "2669959";
  const MachinApp = "MachinApp";
  return (
    <>
      <footer className="bg-gradient-to-r from-green-500 to-green-700 text-white mt-10 shadow">
        <div className="max-w-screen-xl mx-auto p-6 flex flex-col items-center">
          <span className="text-3xl font-bold mb-2">{MachinApp}</span>
          <p className="text-xl italic mb-4 text-center">
            Si puedes imaginarlo, Puedes programarlo
          </p>
          <hr className="w-full border-green-400 my-4 opacity-30" />
          <div className="flex flex-col items-center">
            <span className="text-sm">
              © {ahora} {MachinApp}™
            </span>
            <span className="text-sm mt-2">ID: {ID}</span>
          </div>
        </div>
      </footer>
    </>
  );
};

/*
 */

/* 
      <footer className={` mt-10 shadow ${V.bg_sena_verde}`}>
        <div className=" flex-row w-full max-w-screen-xl mx-auto p-2">
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="self-center text-2xl whitespace-nowrap dark:text-white text-white font-bold">
            {MachinApp}
          </span>
          <span className="block text-white text-large font-bold sm:text-center">
            Si puedes imaginarlo, Puedes programarlo
          </span>
          <div className="flex-row">
            <span className="block text-sm text-white sm:text-center dark:text-gray-400">
              © {ahora} <a className="hover:underline">{MachinApp}™</a>.{" "}
              <div>ID: {ID}</div>
            </span>
          </div>
        </div>
      </footer>
     */
