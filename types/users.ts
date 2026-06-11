export interface IUser {
  _id: string;
  id: string;

  fName: string;
  lName: string;
  fullName: string;

  email: string;
  password: string;

  phone: string;
  country: string;
  gender: "male" | "female";

  dateOfBirth: string;

  points: number;
  balance: number;

  role: "admin" | "user";

  createdAt: string;
  updatedAt: string;

  transactions: {
    _id: string;
    id: string;
    userId: string;

    materialType: string;
    weight: number;
    pointsEarned: number;

    type: "earn" | "spend";

    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];

  conversions: {
    _id: string;
    id: string;
    userId: string;

    pointsUsed: number;
    moneyAdded: number;

    status: "pending" | "sent" | "rejected";

    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];

  __v: number;
}
export interface IUsersResponse {
  users: IUser[];
}

export interface ICreate {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  dateOfBirth: string;
  gender: "male" | "female";
}
