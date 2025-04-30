import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";



const SmoothCardCarousel = ({ scrollDirection , reverse  }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);//232  
  const [isLoaded,setIsLoaded]=useState(false)

  // console.log(cardHeight,'cardHeight');
  
  useEffect(() => {
    if (cardRef.current) {
      // console.log("setting height of cards");
      setCardHeight(cardRef.current.offsetHeight + 8);
    }
  }, []);

  const cards = [
    { archtypeSrc: "/images/archtypes/Artist.png" },
    { archtypeSrc: "/images/archtypes/Harmoniser.png" },
    { archtypeSrc: "/images/archtypes/Sage.png" },
    { archtypeSrc: "/images/archtypes/Ruler.png" },
    { archtypeSrc: "/images/archtypes/Protagonist.png" },
    { archtypeSrc: "/images/archtypes/Visionary.png" },
    { archtypeSrc: "/images/archtypes/Strategist.png" },
    { archtypeSrc: "/images/archtypes/Explorer.png" },
    { archtypeSrc: "/images/archtypes/Indomitable-spirit.png" },
    { archtypeSrc: "/images/archtypes/Maverick.png" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!cardRef.current) return;// can be commented 

    let animationFrameId;
    let startTime;
    const totalCardHeight =
      cardHeight * cards.length + cardHeight * cards.length; 
      
    const scrollSpeed = 0.1 // Pixels per millisecond

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const totalScroll = elapsed * scrollSpeed;
      const currentScroll = totalScroll % totalCardHeight;

      if (scrollDirection === "up") {
        container.style.transform = `translateY(-${currentScroll}px)`;
      } else {
        container.style.transform = `translateY(${currentScroll}px)`;
        container.style.bottom = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [cardHeight]);

  const displayCards = (arrays) => {
    return arrays.map((card, index) => (
      <div
        ref={cardRef}
        key={index}
        className={`absolute w-full`}
        style={{
          top: `${
            scrollDirection === "up"
              ? `${index * cardHeight}px`
              : `-${index * cardHeight}px`
          }`,
          left: "0",
        }}
      >
        <Image
          className="w-full h-auto object-cover"
          priority={true}
          width={101}
          height={224}
          src={card.archtypeSrc}
          alt="Archetype image"
        />
      </div>
    ));
  };

  useEffect(()=>{
    setIsLoaded(true);
  },[])

  return (
    <div
      className={`relative w-full h-full flex  justify-center overflow-hidden 
                transform transition-all duration-1000 ease-in-out 
                ${isLoaded ? "opacity-100 " : "opacity-0 "}
    `}
    >
      <div
        ref={containerRef}
        className="absolute w-full flex items-center justify-center"
      >
        {reverse
          ? displayCards([...cards, ...cards].reverse())
          : scrollDirection === "down"
          ? displayCards([...cards, ...cards].sort(() => Math.random() - 0.5)) // warning is thrown due to math.random
          : displayCards([...cards, ...cards])}
      </div>
    </div>
  );
};

export default SmoothCardCarousel;
