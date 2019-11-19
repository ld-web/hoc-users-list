import React from "react";
import { DoubleBounce } from "better-react-spinkit";

const Loader = () => (
  <div className="p-5 d-flex justify-content-center">
    <DoubleBounce size={50} color="#AAA" />
  </div>
);

export default Loader;
