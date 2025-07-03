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
    | "date"
    | "subForm"
    | "array";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  validation?: Yup.AnySchema;
  subForm?: any;
  fields?: ProductFormField[]; // For array type fields
}
