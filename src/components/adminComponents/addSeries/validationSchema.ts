import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  seriesName: Yup.string().required("series is required"),
});
