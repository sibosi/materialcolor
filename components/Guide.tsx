"use client";
import React from "react";

const steps = ["Pick a color", "Rename the color", "Copy the code"];

const Guide = () => {
  return (
    <div>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-800 font-bold text-primary-100">
              {index + 1}
            </div>
            <div className="ml-2">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
