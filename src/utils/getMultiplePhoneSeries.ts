import { ALLPHONES } from "constants/allPhone";

export const getMultiplePhoneSeries = (seriesList: any) => {
  const seriesProducts =
    Array.isArray(ALLPHONES) &&
    ALLPHONES.filter((product: any) => seriesList.includes(product.series));

  return seriesProducts;
};
