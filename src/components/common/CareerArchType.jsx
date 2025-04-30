import React, { useEffect, useRef } from "react";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-gray-500",
];

const CareerArchetype = () => {
  const column1Ref = useRef(null);
  const column2Ref = useRef(null);
  const column3Ref = useRef(null);

  // Infinite scrolling logic
  const handleScroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollTop += direction; // Increment scroll position
      const scrollHeight = ref.current.scrollHeight;
      const offsetHeight = ref.current.offsetHeight;

      // Reset scrollTop if it reaches the end or the start
      if (ref.current.scrollTop >= scrollHeight - offsetHeight) {
        ref.current.scrollTop = 0; // Reset to top
      } else if (ref.current.scrollTop <= 0) {
        ref.current.scrollTop = scrollHeight - offsetHeight; // Reset to bottom
      }
    }
  };

  useEffect(() => {
    // Set up intervals for infinite scrolling
    const interval1 = setInterval(() => handleScroll(column1Ref, 1), 20); // Column 1 scrolls down
    const interval2 = setInterval(() => handleScroll(column2Ref, -1), 20); // Column 2 scrolls up
    const interval3 = setInterval(() => handleScroll(column3Ref, 1), 20); // Column 3 scrolls down

    // Clean up intervals on unmount
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  // Generate cards for each column
  const generateCards = () =>
    colors.map((color, index) => (
      <div
        key={index}
        className={`h-40 w-32 ${color} rounded-lg m-2 flex items-center justify-center text-white text-lg font-bold`}
      >
        Card {index + 1}
      </div>
    ));

  return (
    <div className="flex space-x-4 overflow-hidden p-4 bg-gray-100 h-screen">
      {/* Column 1 */}
      <div
        ref={column1Ref}
        className="flex flex-col space-y-4 overflow-hidden h-full"
      >
        {generateCards()}
        {generateCards()} {/* Duplicate for infinite scrolling */}
      </div>

      {/* Column 2 */}
      <div
        ref={column2Ref}
        className="flex flex-col space-y-4 overflow-hidden h-full"
      >
        {generateCards()}
        {generateCards()} {/* Duplicate for infinite scrolling */}
      </div>

      {/* Column 3 */}
      <div
        ref={column3Ref}
        className="flex flex-col space-y-4 overflow-hidden h-full"
      >
        {generateCards()}
        {generateCards()} {/* Duplicate for infinite scrolling */}
      </div>
    </div>
  );
};

export default CareerArchetype;
