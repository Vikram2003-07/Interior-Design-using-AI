"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import EmptyState from "./EmptyState";
import Link from "next/link";
import { db } from "@/config/db";
import { AiGeneratedImages } from "@/config/schema";
import { eq } from "drizzle-orm";
import RoomDesignOutput from "../create-new/_components/RoomDesignOutput";

const Listing = () => {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetRoomList();
  }, [user]);

  const GetRoomList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(AiGeneratedImages)
      .where(
        eq(AiGeneratedImages.userEmail, user?.primaryEmailAddress?.emailAddress)
      );
    setUserRoomList(result);
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-3xl">
          Hello, {user?.fullName || "User"}
        </h2>
        <Link href={"/dashboard/create-new"}>
          <Button>+ Redesign Room</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      ) : userRoomList?.length == 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-5">
          <h2 className="font-semibold text-2xl text-primary mb-5">
            Your Room List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userRoomList?.map((item, index) => {
              return <RoomDesignOutput key={index} room={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
