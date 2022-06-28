export interface CreateUserDTO {
  name: string;
  passWord: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  address: string;
  accessToken: string;
  verified: boolean;
}

export interface UserLoginEmail {
  email: string;
  passWord: string;
}

export interface UserPayload {
  email: string;
}

export interface UserLoginPhone {
  phoneNumber: string;
}
