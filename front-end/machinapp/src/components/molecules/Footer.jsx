const Footer = () => {
  let hoy = new Date();
  let ahora = hoy.toLocaleDateString();
  const ID = "2669959";
  const MachinApp = "MachinApp";
  return (
    <>
      <footer className=" mt-10 shadow bg-green-500 dark:bg-gray-900 ">
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
    </>
  );
};

export default Footer;
