export interface FullUserData {
  name: string;
  lastName: string;
  phone: string;
}

export interface UserUpdateData {
  name?: string;
  lastName?: string;
  phone?: string;
}

export interface PasswordUpdateData {
  password: string;
  newPassword: string;
}
