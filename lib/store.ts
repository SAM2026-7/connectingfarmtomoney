import { MOCK_MESSAGES, MOCK_ORDERS, MOCK_PRICES, MOCK_PRODUCE } from "@/lib/data";
import { Message, Order, PriceData, ProduceListing, User } from "@/lib/types";

type FarmStore = {
  produce: ProduceListing[];
  orders: Order[];
  messages: Message[];
  prices: PriceData[];
  users: User[];
};

const globalStore = globalThis as typeof globalThis & { __farmToMoneyStore?: FarmStore };

export const store: FarmStore = globalStore.__farmToMoneyStore ?? {
  produce: [...MOCK_PRODUCE],
  orders: [...MOCK_ORDERS],
  messages: [...MOCK_MESSAGES],
  prices: [...MOCK_PRICES],
  users: [],
};

globalStore.__farmToMoneyStore = store;
