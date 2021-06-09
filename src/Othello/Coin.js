import React from "react";

const Coin = ({ color, shadow }) => {
  return (
    <>
      <div
        className={`h-8 w-8 sm:h-12 sm:w-12 ${shadow ? "shadow-coin" : ""} ${
          color === "dark"
            ? "bg-dark rotate-y-0 duration-400 delay-100"
            : "bg-white rotate-y-180 duration-400 delay-100"
        } rounded-full`}
      />
    </>
  );
};

export default Coin;
