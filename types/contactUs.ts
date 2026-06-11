export interface Contact {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  country: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
export interface GetContactsResponse {
  contacts: Contact[];
}
