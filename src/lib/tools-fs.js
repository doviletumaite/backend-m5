import fs from "fs-extra"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const postsJSONPath = join(dataFolderPath, "posts.json")
const authorsJSONPath = join(dataFolderPath, "authors.json")

const publicFolderPath = join(process.cwd(), "./public/img")
export const savePicture = (name, contentAsBuffer) => writeFile(join(publicFolderPath, name), contentAsBuffer)

export const getPost = () => readJSON(postsJSONPath)
export const getAuthors = () => readJSON(authorsJSONPath)

export const writePosts = content => writeJSON(postsJSONPath, content)
export const writeAuthors = content => writeJSON(authorsJSONPath, content)

