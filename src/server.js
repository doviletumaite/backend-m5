import  express  from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import postsRouter from "./services/blog/index.js"
import filesRouter from "./services/files/index.js"
import cors from "cors"
import { badRequestErrorHandler, forbiddenErrorHandler, genericServerErrorHandler, notFoundErrorHandler } from "./errorHandlers.js"

const server = express()
const port = 3002
const logger = (req, res, next) => {
  console.log(`Request Method ${req.method} +++++++ Request URL ${req.url}`)
  next()
}
server.use(logger)
server.use(cors())
server.use(express.json())

server.use("/posts", postsRouter)
server.use("/authors", authorsRouter)
server.use("/files", filesRouter)

server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

console.table(listEndpoints(server))
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
  