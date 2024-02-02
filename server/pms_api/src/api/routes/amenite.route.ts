import { Router } from "express";
import {
  createAmeniteCategory,
  getAllAmeniteCategoriesAndAllAmeniteDetails,
} from "./../../controller/property/amenitecategory.controller";
import {
  createAmenite,
  // getAllAmeniteCategoriesAndAllAmeniteDetails,
} from "./../../controller/amenite.controller";
import { protect } from "./../../middlewares/auth.middleware";

const router = Router();

export default (app: Router) => {
  app.use("/amenite", router);

  router
    .route("/category")
    .post(createAmeniteCategory as any)
    .get(getAllAmeniteCategoriesAndAllAmeniteDetails as any);

  router.route("/").post(protect as any, createAmenite as any);
};

// .get(getAllAmeniteCategoriesAndAllAmeniteDetails as any);
