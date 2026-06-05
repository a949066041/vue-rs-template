export interface UserEntity {
  id: number
  email: string
  gender: string
  firstName: string
  lastName: string
}

export interface UserLoginParams {
  username: string
  password: string
  expiresInMins?: number
}

export interface LoginResponse {
  image: string
  accessToken: string
  refreshToken: string
}

export type LoginRes = LoginResponse & UserEntity

export interface UserList {
  users: UserEntity[]
  skip: number
  limit: number
  total: number
}
