import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  children?: React.ReactNode;
};

const Input = ({ className, children, ...props }: InputProps) => {
  return (
    <input
      placeholder="input"
      className={
        className +
        " " +
        "flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      }
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
