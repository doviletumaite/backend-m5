// http://localhost:3002/authors
import express from "express"
import uniqid from "uniqid";
import { getAuthors, writeAuthors } from "../../lib/tools-fs.js";


const authorsRouter = express.Router()
authorsRouter.post("/", async (req, res, next)=>{
  try {
      const author = {
          id: uniqid(),
          ...req.body,
          createdAt: new Date(), 
      }
      const authors = await getAuthors()
      authors.push(author)
      await writeAuthors(authors)
      res.send(author)
  } catch (error) {
    next(error);   
  }
})
authorsRouter.get("/", async (req, res, next)=>{
    try {
        const authors = await getAuthors()
        console.log(authors)
        res.send(authors)
    } catch (error) {
        next(error);  
    }
})
authorsRouter.get("/:id", async (req, res, next)=>{
    try {
        const authors = await getAuthors()
        const author = authors.find((a) => a.id === req.params.id)
        if(!author) {
            res. status(404).send({message: `author with ${req.params.id} is not found!` }) 
        }
        res.send(author)
    } catch (error) {
        next(error);     
    }
})
authorsRouter.put("/:id", async (req, res, next)=>{
    try {
     const authors = await getAuthors()
     const index = authors.findIndex(a => a.id === req.params.id)
     const editedAuthor = {...authors[index], ...req.body, updatedAt: new Date()}
     authors[index] = editedAuthor
     await writeAuthors(authors)
     res.send(editedAuthor)
    } catch (error) {
        next(error);     
    }
})
authorsRouter.delete("/:id", async (req, res, next)=>{
    try {
    let authors = await getAuthors()
    const author = authors.find((a) => a.id === req.params.id)
    if(!author) {
        res. status(404).send({message: `author with ${req.params.id} is not found!` }) 
    }
    authors = authors.filter(a => a.id !== req.params.id)
    await writeAuthors(authors)
    res.status(204).send() 
    } catch (error) {
        next(error);   
    }
})
export default authorsRouter