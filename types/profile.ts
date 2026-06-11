export interface IUser {
  message: string;
  user: User;
}

export interface User {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  password?: string;
  phone?: string;
  country: string;
  gender: string;
  dateOfBirth: string;
  points: number;
  balance: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  fullName: string;
  id: string;
}

export interface IUserPoints {
  points: number;
  balance: number;
}

export interface UserTransaction {
  _id: string;
  id: string;
  userId: string;
  materialType: string;
  weight: number;
  pointsEarned: number;
  type: "earn" | "spend";
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IUserTransactionsResponse {
  transactions: UserTransaction[];
}

export interface UserConversion {
  _id: string;
  id: string;
  userId: string;
  pointsUsed: number;
  moneyAdded: number;
  status: "pending" | "sent" | "rejected" | string;
  method?: "instapay" | "wallet";
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IUserConversionsResponse {
  conversions: UserConversion[];
}

export interface IConvertPointsResponse {
  fullName: string;
  points: number;
  phoneNumber: string;
  method: "instapay" | "wallet";
}
