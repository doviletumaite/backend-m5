// http://localhost:3002/posts
import express from "express"

const postsRouter = express.Router()
postsRouter.post("/", (req, res, next)=>{

})
postsRouter.get("/", (req, res, next)=>{
    
})
postsRouter.get("/:id", (req, res, next)=>{
    
})
postsRouter.put("/:id", (req, res, next)=>{
    
})
postsRouter.delete("/:id", (req, res, next)=>{
    
})
export default postsRouter