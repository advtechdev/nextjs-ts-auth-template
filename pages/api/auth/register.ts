import signToken from "src/helpers/auth/signToken"
import validated from "src/middlewares/validated"
import UserModel, { UserDocument } from "src/models/user"
import nc from "src/nc"
import { object, refine, size, string } from "superstruct"

import isEmail from "validator/lib/isEmail"

const RegisterBody = object({
  email: refine(string(), "email", (value) => isEmail(value)),
  password: size(string(), 4, 128),
})

export default nc.post(validated(RegisterBody), async (req, res) => {
  const { email, password } = req.body

  let user: UserDocument

  try {
    user = await UserModel.create({ email, password })
  } catch (e) {
    return res.status(400).json({ errors: [{ message: "email taken" }] })
  }

  res.json({ token: signToken(user) })
})
