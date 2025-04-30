import React, { useState } from "react";

function ProgressBar({totalSteps=11,step}) {  
  return (
    <div className="flex flex-col w-full  items-center space-y-4">
      {/* Progress bar */}
      <div className="flex items-center w-full">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Dot */}
            <div
              className={`h-3 w-3 rounded-full ${
                index < step ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            {/* Dashed line (only render if not the last dot) */}
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-[7%] ${
                  // 10 steps each takes 7% of the width -> 70% of widhth by lines rest by dots
                  index < step - 1 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
