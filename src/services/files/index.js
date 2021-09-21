import express from "express"
import multer from "multer"
import { savePicture } from "../../lib/tools-fs.js"

const filesRouter = express.Router()

filesRouter.post("/uploadAvatar/:id",
multer({})
.single("picture"),
async (req, res, next) => {
    try {
      await savePicture(req.file.originalname, req.file.buffer)  
      res.send("OK")
    } catch (error) {
        next(error) 
    }
})
export default filesRouter