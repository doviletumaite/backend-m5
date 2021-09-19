import  express  from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import postsRouter from "./services/blog/index.js"


const server = express()
const port = 3002
server.use(express.json())

server.use("/posts", postsRouter)
server.use("/authors", authorsRouter)

console.table(listEndpoints(server))
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
  