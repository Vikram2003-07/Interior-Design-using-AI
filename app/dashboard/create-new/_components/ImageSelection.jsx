"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageSelection = ({ selectedImage }) => {
  const [file, setFile] = useState();
  const onFileSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setFile(file);
      selectedImage(file);
    }
  };
  return (
    <div>
      <label>Upload Your Room Image</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`w-110 h-100 p-4 border border-dotted rounded-xl flex items-center justify-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg relative`}
          >
            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                alt="Upload Room Image"
                fill
                className="rounded-md object-cover"
              />
            ) : (
              <Image
                src="/ImagePlaceholder1.png"
                alt="Upload Room Image"
                width={100}
                height={100}
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          onChange={onFileSelection}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageSelection;
