export interface Me {
  id: string;
  name: string;
  email: string;
  providerUid: string;
  role: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}
