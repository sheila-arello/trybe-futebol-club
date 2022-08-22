export interface Indexable {
  id: number
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface IUser extends Indexable, UserCredentials {
  username: string;
  role: string;
}

export interface CreateUserResponse {
  name: string,
  email: string,
  id: number,
  token: string
}
