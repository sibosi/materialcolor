import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const Button = ({ children, className, size, ...props }: ButtonProps) => {
  className += " ";
  if (size === "sm") className += "h-10 px-4";
  else if (size === "lg") className += "h-12 px-6";
  else className += "h-12 px-5";
  className += " ";

  return (
    <button
      className={
        className +
        "flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
