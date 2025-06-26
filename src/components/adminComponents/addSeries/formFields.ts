import * as Yup from "yup";
import { BannerFormField } from "./formFieldType";

export const formFields: BannerFormField[] = [
  {
    name: "seriesName",
    label: "series Name",
    type: "text",
    required: true,
    validation: Yup.string().required("series name is required"),
  },
];
