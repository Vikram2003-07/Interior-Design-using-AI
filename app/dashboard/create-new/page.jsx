"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalRequirments from "./_components/AdditionalRequirments";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import axios from "axios";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CreateNew = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiOutputImage, setAiOutputImage] = useState(null);
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);

  const onHandleInputChange = (value, fieldname) => {
    setFormData((prev) => ({ ...prev, [fieldname]: value }));
    console.log(formData);
  };

  // Compress and convert image to JPEG for Replicate API compatibility
  const compressImage = (file, maxSize = 1024, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;

          // Resize if larger than maxSize
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            } else {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          // Fill with white background (removes alpha channel, ensures RGB)
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to JPEG blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                console.log("Image compressed:", {
                  originalSize: file.size,
                  compressedSize: blob.size,
                  dimensions: `${width}x${height}`,
                });
                resolve(blob);
              } else {
                reject(new Error("Failed to compress image"));
              }
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const SaveRawImageToSupabase = async () => {
    const supabase = createClient();
    const filename = `${Date.now()}_raw.jpg`; // Changed to .jpg

    if (!formData.image) {
      console.error("No image in formData");
      return null;
    }

    // Ensure we have a File/Blob. If image is a data URL string convert to Blob
    let fileToUpload = formData.image;

    // If it's a data URL (base64) convert it to a blob
    if (typeof fileToUpload === "string" && fileToUpload.startsWith("data:")) {
      const res = await fetch(fileToUpload);
      fileToUpload = await res.blob();
      try {
        fileToUpload = new File([fileToUpload], "temp.png", {
          type: fileToUpload.type || "image/png",
        });
      } catch (e) {
        // File constructor may not be available in some environments; blob still works
      }
    }

    // Compress and convert to JPEG before upload
    try {
      console.log("Original file size:", fileToUpload.size);
      fileToUpload = await compressImage(fileToUpload);
      fileToUpload = new File([fileToUpload], filename, { type: "image/jpeg" });
    } catch (compressError) {
      console.error("Failed to compress image:", compressError);
      // Continue with original file if compression fails
    }

    // Debugging: confirm size/type before upload
    console.log("Uploading file:", {
      type: fileToUpload.type,
      size: fileToUpload.size ?? "unknown",
      constructor: fileToUpload.constructor.name,
    });

    const { data, error } = await supabase.storage
      .from("room-design")
      .upload(filename, fileToUpload, {
        upsert: false,
        contentType: fileToUpload.type,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("room-design")
      .getPublicUrl(filename);

    console.log("File uploaded successfully", publicData?.publicUrl, data);
    return publicData?.publicUrl ?? null;

    setOriginalImage(downloadUrl);
  };

  const GenerateAiImage = async () => {
    setLoading(true);
    try {
      //save raw image to supabase
      const rawImageUrl = await SaveRawImageToSupabase();

      if (!rawImageUrl) {
        console.error("Failed to upload image");
        alert("Failed to upload image. Please try again.");
        return;
      }

      const result = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalRequirements: formData?.additionalRequirements,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      console.log("API Response:", result.data);
      setAiOutputImage(result.data.result); //output image url
      setOriginalImage(rawImageUrl); // save original image URL
      setOpenOutputDialog(true); // open the output dialog
      setLoading(false);
    } catch (error) {
      console.error("Error in GenerateAiImage:", error);
      console.error("Error response data:", error.response?.data);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      const errorDetails = error.response?.data?.details || "";
      alert(
        "Error: " +
          errorMessage +
          (errorDetails ? "\n\nDetails: " + errorDetails : "")
      );
    }
  };

  return (
    <div>
      <Link href="/dashboard">
        <Button variant="outline" className="mb-4">
          ← Your List
        </Button>
      </Link>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Rendering
      </h2>
      <p className="text-lg text-center text-gray-500">
        Transform any room with one click. Upload your room image, choose your
        style, and watch AI create a stunning interior design 🤩
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-1">
        {/* Image Selection */}
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />

        {/* Form Input Section */}
        <div className="flex flex-col">
          {/* Room type */}
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />

          {/* Design Style */}
          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />

          {/* Aditional Requirement Textarea(Optional) */}
          <AdditionalRequirments
            additionalRequirements={(value) =>
              onHandleInputChange(value, "additionalRequirements")
            }
          />

          {/* Button to Generate Image */}
          <button
            className="w-full h-12 bg-primary text-white rounded-md mt-4"
            onClick={GenerateAiImage}
          >
            Generate Image
          </button>
          <p className="text-sm text-gray-500 mt-2">
            NOTE : 1 credit will be used to generate this image.
          </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        originalImage={originalImage}
        aiOutputImage={aiOutputImage}
      />
    </div>
  );
};

export default CreateNew;
