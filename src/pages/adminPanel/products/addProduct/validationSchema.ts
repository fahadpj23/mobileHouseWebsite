import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  productName: Yup.string().required("product name is required"),
  brand: Yup.string().required("brand is required"),
  ram: Yup.string().required("ram is required"),
  storage: Yup.string().required("storage is required"),
  price: Yup.string().required("price is required"),
  mrp: Yup.string().required("mrp is required"),
  series: Yup.string().required("series is required"),
  networkType: Yup.string().required("networkType is required"),
  display: Yup.string().required("display is required"),
  frontCamera: Yup.string().required("frontCamera is required"),
  rearCamera: Yup.string().required("rearCamera is required"),
  os: Yup.string().required("os is required"),
  processor: Yup.string().required("processor is required"),
  battery: Yup.string().required("Battery is required"),
});
