import React, { useState } from "react";
import TinderCard from "react-tinder-card";

const characters = [
  {
    name: "Richard Hendricks",
    image: "/api/placeholder/400/600",
    description: "CEO of Pied Piper",
  },
  {
    name: "Erlich Bachman",
    image: "/api/placeholder/400/600",
    description: "Incubator Owner",
  },
  {
    name: "Monica Hall",
    image: "/api/placeholder/400/600",
    description: "VP of Operations",
  },
  {
    name: "Jared Dunn",
    image: "/api/placeholder/400/600",
    description: "Chief Operating Officer",
  },
];

const TinderCardStack = () => {
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete + " to the " + direction);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Swipe the Cards!</h1>

      <div className="relative w-80 h-96 ">
        {characters.map((character, index) => (
          <TinderCard
            key={character.name}
            className="absolute"
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              className={`w-full h-full p-6 rounded-lg shadow-lg bg-white transition-transform duration-300 ${
                index === 2 ? "bg-green-200" : ""
              }`}
              style={{
                transform: `translateY(${index * -20}px) rotateX(${
                  index * 2
                }deg)`,
                zIndex: characters.length - index,
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-gray-600 bg-opacity-50 text-white p-4 rounded-b-lg">
                <h2 className="text-xl font-bold">{character.name}</h2>
                <p className="text-sm">{character.description}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {lastDirection ? (
        <div className="mt-4 text-center">
          <p className="text-lg">You swiped {lastDirection}</p>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <p className="text-lg">Swipe a card!</p>
        </div>
      )}
    </div>
  );
};

export default TinderCardStack;
