import React, { lazy } from "react";
import Layout from "../Layout/Layout";

const Nav = lazy(() => import("../../components/Nav"));

const Home = () => {
  return (
    <>
      <Layout contenido={""} />
    </>
  );
};

export default Home;
