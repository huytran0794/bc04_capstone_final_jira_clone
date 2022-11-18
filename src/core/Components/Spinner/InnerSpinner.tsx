import React from "react";

// import local interface
import { InterfaceSpinner } from "../../models/common/BaseProps.Interface";

/* import packages */
import { MoonLoader } from "react-spinners";
import clsx from "clsx";

export default function InnerSpinner({
  isLoading = true,
  additionalClass,
}: InterfaceSpinner) {
  console.log("Sppiner is loading");

  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";
  return (
    <div
      className={clsx(
        "innerSpinner",
        "absolute left-0 top-0 flex justify-center items-center z-50",
        "h-full w-full",
        loadingClass,
        additionalClass,
        "transition-all duration-500"
      )}
    >
      <MoonLoader />
    </div>
  );
}
