import { Middleware } from "src/nc"
import { Struct, validate } from "superstruct"

const validated = (struct: Struct): Middleware => async (req, res, next) => {
  const [error] = validate(req.body, struct)

  if (error)
    return res.status(400).json({
      errors: error
        .failures()
        .map(({ key, message, refinement }) => ({ key, message, refinement })),
    })

  next()
}

export default validated
