import React from "react";

import Header from "./header";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Mainlayout;
