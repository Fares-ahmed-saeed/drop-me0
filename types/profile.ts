export interface IUser {
  message: string;
  user: User;
}

export interface User {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
  country: string;
  gender: string;
  dateOfBirth: string;
  points: number;
  balance: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
}

export interface IUserPoints {
  points: number;
  balance: number;
}

export interface IConvertPointsResponse {
  fullName: string;
  points: number;
  phoneNumber: string;
  method: "instapay" | "wallet";
}
