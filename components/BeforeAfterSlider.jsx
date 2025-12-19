"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    
    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl cursor-col-resize select-none shadow-2xl border-4 border-white"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Background) */}
      <Image
        src={afterImage}
        alt="After Design"
        fill
        className="object-cover"
        priority
      />

      {/* Before Image (Foreground - Clipped) */}
      <div 
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeImage}
          alt="Before Design"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 w-4 h-4"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Before</div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">After</div>
    </div>
  );
};

export default BeforeAfterSlider;
