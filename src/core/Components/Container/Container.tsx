import clsx from "clsx";
import React from "react";

/* import local interface */
import { BaseProps } from "../../constant/Intefaces/BaseProps.Interface";

const Container = ({ className, children }: BaseProps) => {
  return (
    <div
      className={clsx(
        "container mx-auto px-4 max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
