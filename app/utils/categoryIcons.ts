import {
  FaUtensils,
  FaCar,
  FaFilm,
  FaFileInvoice,
  FaHeartbeat,
  FaShoppingBag,
  FaBook,
  FaYoutube,
  FaPlane,
  FaGift,
  FaHandHoldingHeart,
  FaMoneyBill,
  FaLaptop,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";
import { IconType } from "react-icons";

export const categoryIcons: Record<string, IconType> = {
  // Debit
  Food: FaUtensils,
  "Transport & Fuel": FaCar,
  Entertainment: FaFilm,
  Bills: FaFileInvoice,
  "Health & Medicine": FaHeartbeat,
  "Shopping & Clothing": FaShoppingBag,
  "Education & Learning": FaBook,
  Subscriptions: FaYoutube,
  Travel: FaPlane,
  Gifts: FaGift,
  Donations: FaHandHoldingHeart,

  // Credit
  Salary: FaMoneyBill,
  Freelance: FaLaptop,
  Investment: FaChartLine,
  Gift: FaGift,

  Other: FaWallet,
};