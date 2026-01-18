import React from "react";

const Loader = ({className}) => {
  return (
    <div className={` border-4 ${className} border-gray-300 rounded-full animate-spin`}></div>
  );
};

export default Loader;
