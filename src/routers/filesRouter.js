const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FILE_DIR = path.resolve('./tmp');
const router = new express.Router();

const storage = multer.diskStorage({         // storage - middleware
    destination: (req, file, cb) => {  //   destination - путь к папке, в к-рой хранится временно файл. cb - аналог 'next', callback
        cb(null, FILE_DIR);
    },
    filename: (req, file, cb) => {
        const [filename, extension] = file.originalname.split('.');
        cb(null, `${uuidv4()}.${extension}`);
    }
});

const { asyncWrapper } = require('../helpers/apiHelpers');
const { uploadController } = require('../controllers/filesController');

const uploadMiddleware = multer({ storage });

// POST /api/files/upload
// content-type: multipart/form-data
router.post('/upload', uploadMiddleware.single('avatar'), asyncWrapper(uploadController));
router.use('/download', express.static(FILE_DIR));


module.exports = { filesRouter: router };  