export interface CreateUserDTO {
  userName: string;
  passWord: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  address: string;
  salt: string;
  tokenUser: [];
  verified: boolean;
}

export interface UserLogin {
  email: string;
  passWord: string;
}
