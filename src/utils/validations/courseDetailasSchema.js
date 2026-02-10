// validations/courseDetailsSchema.js
import * as Yup from "yup";

export const CourseDetailsSchema = Yup.object({
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),

  objectives: Yup.array()
    .of(Yup.string().trim().required("Objective required"))
    .min(1, "At least one objective is required"),

  requirements: Yup.array()
    .of(Yup.string().trim().required("Requirement required"))
    .min(1, "At least one requirement is required"),
});
