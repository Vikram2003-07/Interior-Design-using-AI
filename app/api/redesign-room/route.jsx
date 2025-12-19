import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/config/db";
import { AiGeneratedImages } from "@/config/schema";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req) {
  console.log("=== API Route Hit ===");

  let body;
  try {
    body = await req.json();
  } catch (parseError) {
    console.error("Failed to parse request body:", parseError);
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { imageUrl, roomType, designType, additionalRequirements, userEmail } =
    body;

  console.log("Received request:", {
    imageUrl,
    roomType,
    designType,
    additionalRequirements,
    userEmail,
  });

  // Validate required fields
  if (!imageUrl) {
    return NextResponse.json(
      { success: false, error: "Image URL is required" },
      { status: 400 }
    );
  }

  if (!roomType || !designType) {
    return NextResponse.json(
      { success: false, error: "Room type and design type are required" },
      { status: 400 }
    );
  }

  // Check if API key is configured
  if (!process.env.REPLICATE_API_KEY) {
    console.error("REPLICATE_API_KEY is not set in environment variables");
    return NextResponse.json(
      {
        success: false,
        error:
          "Replicate API key is not configured. Please add REPLICATE_API_KEY to your .env.local file",
      },
      { status: 500 }
    );
  }

  try {
    const prompt = `A ${roomType} with ${designType} style interior design.${
      additionalRequirements ? " " + additionalRequirements : ""
    } High quality, professional interior design photo, well-lit.`;

    const input = {
      image: imageUrl,
      prompt: prompt,
      negative_prompt:
        "low quality, blurry, watermark, unrealistic, lowres, banner, logo, text, deformed, out of focus, ugly, bad lighting",
      guidance_scale: 15,
      num_inference_steps: 50,
    };

    // Call Replicate API
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    console.log("Replicate completed at:", new Date().toISOString());
    console.log("Replicate output:", output);

    // Handle different output formats
    let aiImageUrl;
    if (Array.isArray(output)) {
      aiImageUrl = output[0];
    } else if (typeof output === "string") {
      aiImageUrl = output;
    } else if (output && output.output) {
      aiImageUrl = Array.isArray(output.output)
        ? output.output[0]
        : output.output;
    } else {
      console.error("Unexpected output format:", output);
      throw new Error("Unexpected output format from Replicate");
    }

    console.log("AI Image URL from Replicate:", aiImageUrl);

    // Convert output URL to base64
    const base64Image = await ConvertImageToBase64(aiImageUrl);

    // Save to Supabase Storage
    const supabase = await createClient();
    const fileName = Date.now() + "_ai.png";

    // Convert base64 to buffer for upload
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from("room-design")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload AI image to storage");
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("room-design")
      .getPublicUrl(fileName);

    const downloadUrl = publicData.publicUrl;
    console.log("AI Image saved to Supabase:", downloadUrl);

    // Save All to Database (add your database save logic here)
    const dbResult = await db
      .insert(AiGeneratedImages)
      .values({
        roomType,
        designType,
        originalImage: imageUrl,
        aiImage: downloadUrl,
        userEmail: userEmail,
      })
      .returning({ id: AiGeneratedImages.id });

    console.log("Database result:", dbResult[0]);
    return NextResponse.json({
      success: true,
      result: downloadUrl,
      aiImage: downloadUrl,
      originalImage: imageUrl,
    });
  } catch (e) {
    console.error("Replicate API Error:", e);
    console.error("Error name:", e.name);
    console.error("Error message:", e.message);
    console.error("Error stack:", e.stack);

    return NextResponse.json(
      {
        success: false,
        error: e.message || "Failed to generate AI image",
        details: e.toString(),
      },
      { status: 500 }
    );
  }
}

async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");

  return "data:image/png;base64," + base64ImageRaw;
}
