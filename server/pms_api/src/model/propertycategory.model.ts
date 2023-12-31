import mongoose, {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Types,
} from "mongoose";

enum Category {
  HOTEL = "HOTEL",
  HOMESTAY = "HOMESTAY",
}

export type PropertyCategory = {
  category: Category;
  propertyTypes: Types.ObjectId[];
};

type PropertyCategoryModelType = Model<PropertyCategory>;

const propertyCategorySchema = new mongoose.Schema<PropertyCategory>(
  {
    category: {
      type: String,
      enum: Object.values(Category),
      default: Category.HOTEL,
      required: true,
    },
    propertyTypes: [
      {
        type: Types.ObjectId,
        ref: "PropertyType",
      },
    ],
  },
  {
    timestamps: true,
  }
);

propertyCategorySchema.pre("save", async function (next) {
  this.category = this.category.toUpperCase() as Category;

  next();
});

const PropertyCategory = mongoose.model<
  PropertyCategory,
  PropertyCategoryModelType
>("PropertyCategory", propertyCategorySchema);

export default PropertyCategory;
