import { SubcscriptionType } from "@/types/payment";

type PackageDetail = {
  name: string;
  price: number;
  total: number;
  months: number;
};

const PRICELIST: Record<SubcscriptionType, PackageDetail> = {
  pemula: {
    name: "pemula",
    price: 24000,
    total: 24000,
    months: 1,
  },
  setia: {
    name: "setia",
    price: 22000,
    total: 58000,
    months: 3,
  },
  ambis: {
    name: "ambis",
    price: 20000,
    total: 100000,
    months: 6,
  },
};

export { PRICELIST };
