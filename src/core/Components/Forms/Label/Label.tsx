import clsx from "clsx";
import React from "react";
import { BaseProps } from "../../../constant/Intefaces/BaseProps.Interface";

export default function Label({ className, children }: BaseProps) {
  return (
    <span className={clsx("custom-label", "capitalize", className)}>
      {children}
    </span>
  );
}
