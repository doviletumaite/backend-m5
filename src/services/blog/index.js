// http://localhost:3002/posts
import express from "express"
import uniqid from "uniqid";
import { getPost, writePosts } from "../../lib/tools-fs.js"

const postsRouter = express.Router()
postsRouter.post("/", async (req, res, next)=>{
  try {
      const post = {
          id: uniqid(),
          ...req.body,
          createdAt: new Date(),
      }
      const posts = await getPost()
      posts.push(post)
      await writePosts(posts)
      res.send(post)
  } catch (error) {
    next(error);
  }
})

postsRouter.get("/", async (req, res, next)=>{
   try {
    const posts = await getPost()
    res.send(posts)
   } catch (error) {
    next(error);   }
})

postsRouter.get("/:id", async (req, res, next)=>{
    try {
     const posts = await getPost()  
     const post = posts.find((p) => p.id === req.params.id)
     if(!post) {
         res. status(404).send({message: `blog with ${req.params.id} is not found!` })
     }
     res.send(post)
    } catch (error) {
        next(error);    }
})

postsRouter.put("/:id", async (req, res, next)=>{
    try {
     const posts = await getPost() 
     const index = posts.findIndex(p => p.id === req.params.id)
     const editedPost = {...posts[index], ...req.body, updatedAt: new Date()}
     posts[index] = editedPost  
     await writePosts(posts)
     res.send(editedPost)
    } catch (error) {
        next(error);    }
})

postsRouter.delete("/:id", async (req, res, next)=>{
    try {
     let posts = await getPost()
     const post = posts.find((post)=> post.id === req.params.id)
     if(!post){
         res.status(404).send({message: `post with ${req.params.id} is not found!` })
     }
      posts = posts.filter(post => post.id !== req.params.id)
     await writePosts(posts)
     res.status(204).send()   
    } catch (error) {
        next(error);    }
})
export default postsRouter