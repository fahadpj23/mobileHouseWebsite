import * as Yup from "yup";

export interface ProductFormField {
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
    | "array";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  validation?: Yup.AnySchema;
  fields?: ProductFormField[]; // For array type fields
}
