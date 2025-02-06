import React from "react";
import classNames from "classnames";

export const Button = ({
  type = "button",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles = "py-2 my-2 rounded-md transition duration-200";
  const variantStyles = {
    primary: "bg-[#f8f9fa] text-md text-black hover:bg-[#dee2e6]",
    outline: "border border-gray-300 text-white text-sm hover:bg-zinc-900",
    popOut:
      "text-text py-1 px-3 hover:bg-[#d4d4d8] hover:text-black rounded-md transform hover:scale-105 transition duration-200",
    transparent: "text-white hover:bg-opacity-10",
    none: ""
  };

  return (
    <button
      type={type}
      className={classNames(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
