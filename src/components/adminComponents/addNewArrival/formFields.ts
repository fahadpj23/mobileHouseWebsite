import * as Yup from "yup";
import { BannerFormField } from "./formFieldType";

export const formFields: BannerFormField[] = [
  {
    name: "image",
    label: "Image",
    type: "file",
    required: true,
    validation: Yup.string().required("image Version is required"),
  },
  {
    name: "seriesId",
    label: "Series",
    type: "select",
    required: true,
    options: [],
    validation: Yup.string().required("series is required"),
  },
];
