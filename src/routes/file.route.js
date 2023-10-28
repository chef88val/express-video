
import express from "express";

import path from 'path';
const __dirname = path.resolve();
import { diskStorage } from '../middlewares/multer.js';
import multer from 'multer';
import fs from 'fs';
// SET STORAGE
const storage = diskStorage

const upload = multer({ storage: storage })
const router = express.Router();
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send({ file, dirname: __dirname })

})


//Uploading multiple files 
router.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})
router.post('/uploadphoto', upload.single('myImage'), (req, res) => {

})

export default router