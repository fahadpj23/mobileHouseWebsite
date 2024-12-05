import { ALLPHONES } from "constants/allPhone";

export const getMultiplePhoneSeries = (seriesList: any) => {
  const seriesProducts = ALLPHONES.filter((product: any) =>
    seriesList.includes(product.series)
  );

  return seriesProducts;
};
