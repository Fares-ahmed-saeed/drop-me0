export interface Conversion {
  _id: string;
  userId: {
    userId: string;
    fName: string;
    lName: string;
    fullName: string;
    phone: string;
  };
  pointsUsed: number;
  moneyAdded: number;
  status: "pending" | "failed " | "sent" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  method: "instapay" | "wallet ";
}
export interface GetConversionsResponse {
  conversions: Conversion[];
}

export type IStatus = "pending" | "failed " | "sent" | string;
