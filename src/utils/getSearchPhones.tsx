import { ALLPHONES } from "constants/allPhone";

export const getSearchPhones = (searchWord: string) => {
  const searchPhones = ALLPHONES.filter((phone) =>
    phone.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchWord.toLowerCase().replace(/\s+/g, ""))
  );
  return searchPhones;
};
