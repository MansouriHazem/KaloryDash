export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export type UserState = {
  user: User;
  token: string;
  isLoggedIn: boolean;
};
