import multer  from 'multer';

export const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const users = ['js_cmd', 'jsegarra']
        const user = users[Math.floor(Math.random() * users.length)];
        const folder = `uploads/${user}`
        const existFolder = fs.existsSync(folder)
        if (!existFolder) fs.mkdirSync(folder)
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})