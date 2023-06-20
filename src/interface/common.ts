export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface IUser {
  email: string;
  password: string;
}

export type Response<T> = Promise<T | { message: string }>;
