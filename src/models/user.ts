import { pre, prop } from "@typegoose/typegoose"
import getModelForClass, { DocumentType } from "src/helpers/getModelForClass"

import bcrypt from "bcrypt"

export enum UserRole {
  USER,
  ADMIN,
  ROOT,
}

@pre<User>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})
export class User {
  @prop({ unique: true })
  public email: string

  @prop({ select: false })
  public password: string

  @prop({ enum: UserRole, default: UserRole.USER, type: Number })
  public role?: UserRole

  public async comparePassword(
    this: UserDocument,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}

export type UserDocument = DocumentType<User>

const UserModel = getModelForClass<User>(User)

export default UserModel
