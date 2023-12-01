const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 10000 * 70000, // 10MB (adjust this value as needed)
    },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('Unsupported file type'), false);
            return;
        }
        cb(null, true);
    },
});

module.exports = upload;