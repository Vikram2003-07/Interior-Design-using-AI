import React, { useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import AiOutputDialog from "../../_components/AiOutputDialog";
const RoomDesignOutput = ({ room }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const onClickHandler = (room) => {
    setOpenDialog(true);
  };
  return (
    <div
      className="shadow-md rounded-md cursor-pointer"
      onClick={() => onClickHandler(room)}
    >
      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: room?.aiImage,
        }}
        secondImage={{
          imageUrl: room?.originalImage,
        }}
      />
      <div className="p-2">
        <h3>🏡Room Type: {room?.roomType}</h3>
        <h3>🎨Design Type: {room?.designType}</h3>
      </div>

      <AiOutputDialog
        aiImage={room.aiImage}
        originalImage={room.originalImage}
        closeDialog={() => setOpenDialog(false)}
        openDialog={openDialog}
      />
    </div>
  );
};

export default RoomDesignOutput;
