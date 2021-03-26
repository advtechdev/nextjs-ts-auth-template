import { UserDocument, UserRole } from "src/models/user"

import { sign } from "jsonwebtoken"

export type TokenData = { _id: string; email: string; role: UserRole }

const signToken = (user: UserDocument): string =>
  sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600 * 24 * 7,
    }
  )

export default signToken
