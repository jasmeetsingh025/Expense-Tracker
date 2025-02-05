import React, { useId } from "react";

export const Input = React.forwardRef(function Input(
  { label, type = "text", className, error, ...props },
  ref
) {
  const id = useId();
  return (
    <>
      {label && (
        <label
          className={`block text-sm font-medium text-text ${className}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`mt-1 block w-full p-2 border ${
          error ? "border-red-500" : "border-gray-800"
        } rounded-md bg-primary ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </>
  );
});
