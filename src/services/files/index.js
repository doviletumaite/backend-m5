import express from "express"
import multer from "multer"
import { getPDFReadableStream } from "../../lib/pdf.js"
import { savePicture } from "../../lib/tools-fs.js"
import { pipeline } from "stream"

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

filesRouter.get("/PDFDownload", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", `attachment; filename=example.pdf`)
    const source = getPDFReadableStream()
    const destination = res
    pipeline(source, destination, err => {
      if (err) next (err)
    })
  } catch (error) {
    next(error)
  }
})
export default filesRouter