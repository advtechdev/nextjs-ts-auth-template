import { Middleware } from "src/nc"
import mongoose from "mongoose"
import { accessibleFieldsPlugin, accessibleRecordsPlugin } from "@casl/mongoose"

const database: Middleware = async (_req, _res, next) => {
  if (mongoose.connections[0].readyState) {
    return next()
  }

  mongoose.plugin(accessibleRecordsPlugin)
  mongoose.plugin(accessibleFieldsPlugin)

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    })
  } catch (e) {
    return console.error(e)
  }

  next()
}

export default database
