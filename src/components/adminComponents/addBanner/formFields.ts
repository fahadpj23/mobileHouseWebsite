import * as Yup from "yup";
import { BannerFormField } from "./formFieldType";

export const formFields: BannerFormField[] = [
  {
    name: "images",
    label: "images",
    type: "file",
    required: true,
    validation: Yup.string().required("image is required"),
  },
  {
    name: "series",
    label: "Series",
    type: "select",
    required: true,
    options: [],
    validation: Yup.string().required("networkType is required"),
  },
];
