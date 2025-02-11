export interface PHONESPECIFICATION {
  Display: string;
  "Rear Camera": string;
  "Front Camera": string;
  "RAM | Storage": string;
  Battery: string;
  Network: string;
  OS: string;
  Processor: string;
}

export interface PHONEMODEL {
  id: string;
  name: string;
  brand: string;
  prebook: boolean;
  series: string;
  image: string;
  launchDate: string;
  networkType: string;
  salesPrice: number;
  specialOffer: boolean;
  trendingPhone: boolean;
  rating: number;
  newArrival: boolean;
  mrp: number;
  ram: number;
  storage: number;
  specifications: PHONESPECIFICATION;
}
