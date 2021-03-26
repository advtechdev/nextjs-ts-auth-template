import { NextApiRequest, NextApiResponse } from "next"
import nextConnect, { Middleware as BaseMiddleware } from "next-connect"
import database from "src/middlewares/database"

export type Middleware = BaseMiddleware<NextApiRequest, NextApiResponse>

const nc = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    console.error(err)

    res.status(500).end()
  },
}).all(database)

export default nc
