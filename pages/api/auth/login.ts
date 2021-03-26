import signToken from "src/helpers/auth/signToken"
import validated from "src/middlewares/validated"
import UserModel from "src/models/user"
import nc from "src/nc"
import { object, string } from "superstruct"

const LoginBody = object({
  email: string(),
  password: string(),
  asd: string(),
})

export default nc.post(validated(LoginBody), async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({
    email,
  }).select("+password")

  const passwordComparison = await user?.comparePassword(password)

  if (!passwordComparison)
    return res.status(400).json({ errors: [{ message: "incorrect password" }] })

  res.json({ token: signToken(user) })
})
