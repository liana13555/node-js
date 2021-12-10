const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));   // Этот middleware означает, если прийдет get-запрос по адресу, где в конце будет расширение(напр. 2085-1.png), то файл ищи в папке 'public'

const tempDir = path.join(__dirname, 'temp');
// console.log(tempDir);
// console.log(__dirname);
const contactsDir = path.join(__dirname, 'public', 'contacts');
// console.log(contactsDir);

// С помощью multer создаем промежуточный middleware, чтобы его создать необходимо multer передать настройки 'config'
const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {                // destination - путь к папке, в к-рой хранится временно файл. cb - аналог 'next'
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {          // определяет под каким именем сохраняем файл
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 2048
    }
});

const upload = multer({          // создаем middleware upload 
    storage: multerConfig
})

const contacts = []

app.post('/api/contacts', upload.single('image'), async (req, res) => {
    // console.log(req.file);

    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(contactsDir, originalname);
    // console.log(tempUpload);
    // console.log(resultUpload); 

    try {
        await fs.rename(tempUpload, resultUpload);
        const image = path.join('contacts', originalname);
        const newContact = {
            name: req.body.name,
            id: v4(),
            image
        };
        contacts.push(newContact);

        res.status(201).json(newContact);
    } catch (error) {
        await fs.unlink(tempUpload);
    }
});

app.get('/api/contacts', async (req, res) => {
    res.json(contacts);
})

const { PORT = 3000 } = process.env;

app.listen(PORT);