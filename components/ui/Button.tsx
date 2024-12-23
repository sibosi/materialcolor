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
        "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
