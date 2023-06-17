import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = ({ color, height, width }) => {
  return (
    <TailSpin
      height={height}
      width={width}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
