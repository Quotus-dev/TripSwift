import mongoose, { Document, Schema, Types } from "mongoose";
import { PropertyInfoType, PropertyInfo } from "../model/property.info.model";


interface RoomType extends Document {
  propertyInfo_id: Types.ObjectId | PropertyInfoType;
  name: string;
  type: string;
  price: number;
  available: boolean;
  capacity: number;
  total_room: number;
  image: string[];
  description: string;
}

const roomSchema = new Schema<RoomType>({
  propertyInfo_id: {
    type: Schema.Types.ObjectId,
    ref: "PropertyInfo",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  capacity: {
    type: Number,
    required: true,
  },
  total_room: {
    type: Number,
    required: true,
  },
  image: [{ type: String }],
  description: { type: String },
});

const Room = mongoose.model<RoomType>("Room", roomSchema);

export { Room, RoomType };
