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
    | "textarea"
    | "array";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  validation?: Yup.AnySchema;
  subForm?: any;
  rows?: number;
  fields?: ProductFormField[]; // For array type fields
}
