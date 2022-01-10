export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Credential = {
  email: string;
  name: string;
  token: string;
  exp: Date;
};
