import React from "react";
import Image from "next/image";
import { useState } from "react";
function DesignType({ selectedDesignType }) {
  const Designs = [
    { name: "Modern", image: "/images/modern.png" },
    { name: "Minimalist", image: "/images/minimalist.png" },
    { name: "Traditional", image: "/images/Traditional.png" },
    { name: "Bohemian", image: "/images/bohemian.png" },
    { name: "Industrial", image: "/images/Industrial.png" },
  ];

  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="mt-4">
      <label className="text-slate-700">Select Interior Design Type *</label>
      <div className="my-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Designs.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.name);
              selectedDesignType(design.name);
            }}
          >
            <Image
              src={design.image}
              alt={design.name}
              width={100}
              height={100}
              className={`h-18 cursor-pointer rounded-md hover:scale-110 transition-all
                    ${
                      selectedOption === design.name
                        ? "border-4 border-blue-700 p-0.5"
                        : ""
                    }`}
            />

            <h2 className="text-center text-sm font-medium text-gray-700">
              {design.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignType;
