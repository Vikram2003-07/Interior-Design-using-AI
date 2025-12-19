import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoomType = ({selectedRoomType}) => {
  return (
    <div>
        <label className="text-slate-700">Select Room Type *</label>
      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="---Choose Room Type---" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Living Room">Living Room</SelectItem>
            <SelectItem value="Bed Room">Bed Room</SelectItem>
            <SelectItem value="Kitchen">Kitchen</SelectItem>
            <SelectItem value="Office">Office</SelectItem>
            <SelectItem value="Bathroom">Bathroom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoomType;
