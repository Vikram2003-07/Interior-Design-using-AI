import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";
const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg text-center">
            Redesigning your room... Please wait...
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="bg-transparent flex flex-col items-center justify-center py-6">
          <Image
            src={"/loading.gif"}
            alt="Loading..."
            width={100}
            height={100}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
