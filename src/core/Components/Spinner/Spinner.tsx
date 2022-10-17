import clsx from "clsx";
import React from "react";

/* import packages */
import PuffLoader from "react-spinners/PuffLoader";

export default function Spinner() {
  let isLoading = false;
  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";
  return (
    <div
      className={clsx(
        "spinner",
        "fixed left-0 top-0 bg-slate-700 bg-opacity-95 flex justify-center items-center z-50",
        "h-screen w-screen",
        loadingClass,
        "transition-all duration-[1200ms]"
      )}
    >
      <PuffLoader color="#36d7b7" loading size={80} speedMultiplier={0.7} />
    </div>
  );
}
