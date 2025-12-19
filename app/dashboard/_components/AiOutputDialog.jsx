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
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Button } from "@/components/ui/button";

const AiOutputDialog = ({
  openDialog,
  closeDialog,
  originalImage,
  aiImage,
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI Output</AlertDialogTitle>
            <ReactBeforeSliderComponent
              firstImage={{
                imageUrl: aiImage,
              }}
              secondImage={{
                imageUrl: originalImage,
              }}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
              }}
            >
              Close
            </Button>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AiOutputDialog;
