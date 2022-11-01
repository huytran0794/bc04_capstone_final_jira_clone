import React from "react";

// import local types
import { ButtonLocalProps } from "../../models/common/BaseProps.Interface";

// import other library
import clsx from "clsx";

export default function ButtonLocal({
  children,
  baseColor,
  handleOnClick,
  className,
}: ButtonLocalProps) {
  /* 

    bg-red-500 bg-red-600 
    bg-orange-500 bg-orange-600 
    bg-yellow-500 bg-yellow-600 
    bg-green-500 bg-green-600 
    bg-teal-500 bg-teal-600 
    bg-blue-500 bg-blue-600 
    bg-indigo-500 bg-indigo-600 
    bg-purple-500 bg-purple-600 
    bg-pink-500 bg-pink-600
   */
  return (
    <button
      type="button"
      className={clsx(
        `px-5 py-2.5 rounded-lg`,
        `bg-${baseColor}-500 hover:bg-${baseColor}-600`,
        `text-white text-lg font-medium`,
        `focus:outline-none focus:ring-4 focus:ring-${baseColor}-300`,
        `transition duration-300`,
        className
      )}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
