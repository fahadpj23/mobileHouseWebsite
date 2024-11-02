import { ALLPHONES } from "constants/allPhone";

export const getNewArrivalPhones = () => {
  const newArrivalPhones = ALLPHONES.filter(
    (phones) => phones.newArrival === true
  );
  return newArrivalPhones;
};
