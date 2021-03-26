import { verify } from "jsonwebtoken"
import { UserRole } from "src/models/user"

export interface VerifiedTokenData {
  _id: string
  email: string
  role: UserRole
  iat: number
  exp: number
}

const verifyToken = (token: string): null | VerifiedTokenData =>
  verify(token, process.env.JWT_SECRET) as VerifiedTokenData

export default verifyToken
