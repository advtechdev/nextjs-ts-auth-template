import verifyToken, { VerifiedTokenData } from "src/helpers/auth/verifyToken"
import getStringQuery from "src/helpers/getStringQuery"
import { Middleware } from "src/nc"

export let userData: VerifiedTokenData

const authenticated: Middleware = async (req, res, next) => {
  const token =
    req.headers.authorization?.slice("Bearer ".length) ||
    getStringQuery(req.query.authToken)

  if (!token) return res.status(401).end()

  userData = verifyToken(token)

  if (!userData) return res.status(401).end()

  next()
}

export default authenticated
