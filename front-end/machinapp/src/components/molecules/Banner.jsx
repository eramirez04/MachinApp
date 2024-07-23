import { useContext } from "react";

// banner context
import { BannerContext } from "../../contexts/BannerContext";

// eslint-disable-next-line react/prop-types
const Banner = ({ icon }) => {
  const { titleBanner } = useContext(BannerContext);

  return (
    <>
      <section className="bg-green-600 shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8  max-sm:px-8">
          <span className="text-3xl flex font-bold tracking-tight text-gray-900">
            {icon}
            {titleBanner}
          </span>
        </div>
      </section>
    </>
  );
};

export default Banner;
