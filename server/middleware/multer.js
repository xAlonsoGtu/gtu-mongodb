
import multer, { diskStorage } from 'multer';
import { extname } from 'path';

const EMPRESA_DIR = './server/public/img/empresa/';

const fileFilter_xls = (req, file, cb) => {
  const filetypes = /.xls|.xlsx/;
  const ext_name = filetypes.test(extname(file.originalname).toLowerCase())
  if (ext_name) {
    return cb(null, true);
  } else {
    cb('Error: Sólo archivos excel permitidos!');
  }
};

const storage_temporal = diskStorage({
  destination: "./server/temp/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

export const upload_temporal_xls = multer({ storage: storage_temporal, limits: { fileSize: 5 * (1024 * 1024) }, fileFilter: fileFilter_xls});

//https://www.npmjs.com/package/multer
//https://blog.logrocket.com/multer-nodejs-express-upload-file/