import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  image: Yup.string().required("image is required"),
});
