import React from "react";

// import local types
import { ButtonLocalProps } from "../../models/common/BaseProps.Interface";

// import other library
import clsx from "clsx";

export default function ButtonLocal({
  children,
  baseColor,
  handleOnClick,
}: ButtonLocalProps) {
  return (
    <button
      type="button"
      className={clsx(
        `px-5 py-2.5 rounded-lg`,
        `bg-${baseColor}-500 hover:bg-${baseColor}-600`,
        `text-white text-lg font-medium`,
        `focus:outline-none focus:ring-4 focus:ring-${baseColor}-300`,
        `transition duration-300`
      )}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
