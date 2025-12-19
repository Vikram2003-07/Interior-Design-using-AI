import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { user } = await req.json();

  try {
    // If user already exists
    const userInfo = await db.select().from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    console.log("userInfo: ", userInfo);

    // If user doesn't exist, add to database
    if (userInfo.length === 0) {
      const SaveResult = await db.insert(Users).values({
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl, // Fixed field name from 'image' to 'imageUrl'
      }).returning();
      
      return NextResponse.json({ 'result': SaveResult[0].Users });
    }
    return NextResponse.json({ 'result': userInfo[0] });
  }
  catch (e) {
    console.error("Error in verify-user:", e);
    return NextResponse.json({ error: e });
  }
}