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
    price: 24999,
    total: 24999,
    months: 1,
  },
  setia: {
    name: "setia",
    price: 23333,
    total: 69999,
    months: 3,
  },
  ambis: {
    name: "ambis",
    price: 21666,
    total: 129999,
    months: 6,
  },
};

export { PRICELIST };
