import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="py-10 px-10 md:px-20 lg:px-40 xl:px-60">{children}</div>
    </div>
  );
};

export default DashboardLayout;
