// http://localhost:3002/posts
import express from "express"
import uniqid from "uniqid";
import fs from "fs";
import { getPost, writePosts } from "../../lib/tools-fs.js"

const postsRouter = express.Router()
postsRouter.post("/", async (req, res, next)=>{
  try {
      const post = {
          id: uniqid(),
          createdAt: new Date(),
          updatedAt: new Date(),
      }
      const posts = await getPost()
      posts.push(post)
      await writePosts(posts)
      res.send(post)
  } catch (error) {
    res.sendStatus(500).send({ message: error.message });  
  }
})

postsRouter.get("/", async (req, res, next)=>{
   try {
    const posts = await getPost()
    res.send(posts)
   } catch (error) {
    res.sendStatus(500).send({ message: error.message }); 
   }
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
     res.sendStatus(500).send({ message: error.message });   
    }
})

postsRouter.put("/:id", async (req, res, next)=>{
    try {
     const posts = await getPost() 
     const index = posts.findIndex(p => p.id === req.params.id)
     const editedPost = {...posts[index], ...req.body}
     posts[index] = editedPost  
     await writePosts(editedPost)
     res.send(editedPost)
    } catch (error) {
     res.sendStatus(500).send({ message: error.message }); 
    }
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
    //  res.sendStatus(500).send({ message: error.message }); 
    }
})
export default postsRouter