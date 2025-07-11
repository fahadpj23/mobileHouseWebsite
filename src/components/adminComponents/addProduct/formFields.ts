import * as Yup from "yup";
import { ProductFormField } from "./formFieldType";

export const formFields: ProductFormField[] = [
  {
    name: "productName",
    label: "Product Name",
    type: "text",
    required: true,
    validation: Yup.string().required("Product name is required"),
  },
  {
    name: "brand",
    label: "Brand",
    type: "select",
    options: [
      { value: "samsung", label: "Samsung" },
      { value: "vivo", label: "Vivo" },
      { value: "oppo", label: "Oppo" },
      { value: "redmi", label: "Redmi" },
      { value: "realme", label: "Realme" },
      { value: "tecno", label: "Tecno" },
      { value: "poco", label: "Poco" },
      { value: "iqoo", label: "Iqoo" },
      { value: "infinix", label: "Infinix" },
      { value: "moto", label: "Moto" },
      { value: "iphone", label: "Iphone" },
    ],
    validation: Yup.string().required("brand name is required"),
  },

  {
    name: "rating",
    label: "Rating",
    type: "number",
    required: true,
    validation: Yup.string().required("Rating is required"),
  },

  {
    name: "seriesId",
    label: "Series",
    type: "select",
    required: true,
    options: [],
    validation: Yup.string().required("networkType is required"),
  },
  {
    name: "launchDate",
    label: "launch Date",
    type: "date",
    required: true,
    validation: Yup.string().required("launch Date is required"),
  },
  {
    name: "networkType",
    label: "Network Type",
    type: "select",
    required: true,
    options: [
      { value: "5G", label: "5G" },
      { value: "4G", label: "4G" },
    ],
    validation: Yup.string().required("networkType is required"),
  },
  {
    name: "display",
    label: "Display",
    type: "text",
    required: true,
    validation: Yup.string().required("display is required"),
  },

  {
    name: "frontCamera",
    label: "Front Camera",
    type: "text",
    required: true,
    validation: Yup.string().required("front Camera is required"),
  },
  {
    name: "rearCamera",
    label: "rear Camera",
    type: "text",
    required: true,
    validation: Yup.string().required("rear Camera is required"),
  },
  {
    name: "os",
    label: "Os",
    type: "text",
    required: true,
    validation: Yup.string().required("android Version is required"),
  },
  {
    name: "processor",
    label: "Processor",
    type: "text",
    required: true,
    validation: Yup.string().required("processor is required"),
  },
  {
    name: "battery",
    label: "Battery",
    type: "text",
    required: true,
    validation: Yup.string().required("Battery is required"),
  },

  {
    name: "description",
    label: "Product Description",
    type: "textarea",
    required: true,
    validation: Yup.string().required("Product description is required"),
  },

  {
    name: "variants",
    label: "variants",
    type: "subForm",
    subForm: [
      {
        name: "ram",
        label: "Ram",
        type: "select",
        options: [
          { value: "2", label: "2" },
          { value: "4", label: "4" },
          { value: "8", label: "8" },
          { value: "12", label: "12" },
          { value: "16", label: "16" },
        ],
        validation: Yup.string().required("ram is required"),
      },
      {
        name: "storage",
        label: "Storage",
        type: "select",
        options: [
          { value: "64", label: "64" },
          { value: "128", label: "128" },
          { value: "256", label: "256" },
          { value: "512", label: "512" },
          { value: "1Tb", label: "1TB" },
        ],
        validation: Yup.string().required("storage is required"),
      },
      {
        name: "price",
        label: "Price",
        type: "number",
        required: true,
        validation: Yup.string().required("price is required"),
      },
      {
        name: "mrp",
        label: "Mrp",
        type: "number",
        required: true,
        validation: Yup.string().required("mrp is required"),
      },
    ],
    required: true,
    validation: Yup.string().required("Product name is required"),
  },
  {
    name: "colors",
    label: "color",
    type: "array",
    required: true,
    validation: Yup.string().required("Product name is required"),
  },
];
