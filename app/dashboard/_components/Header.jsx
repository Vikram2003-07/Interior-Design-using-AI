"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "@/app/provider";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="relative group text-gray-600 hover:text-indigo-600 font-medium transition-colors"
  >
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      {children}
    </motion.span>
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
  </Link>
);

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="p-5 px-8 shadow-sm flex justify-between items-center bg-white">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Wand2 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Interior Design AI
        </h2>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/#features">Features</NavLink>
        <NavLink href="/#how-it-works">How it Works</NavLink>
        <NavLink href="/#styles">Styles</NavLink>
        <NavLink href="/#pricing">Pricing</NavLink>
        <NavLink href="/#faq">FAQ</NavLink>
        <NavLink href="/#contact">Contact Us</NavLink>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full hover:bg-slate-300 cursor-pointer transition-all">
          <Image src={"/star.png"} alt="star" width={20} height={20} />
          <h3>{userDetail?.credits}</h3>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
