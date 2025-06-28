import * as Yup from "yup";

export interface BannerFormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "file"
    | "date"
    | "array";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  validation?: Yup.AnySchema;
  fields?: BannerFormField[]; // For array type fields
}
