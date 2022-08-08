import { diskStorage } from 'multer';
import { basename, extname } from 'path';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  let fileName = basename(file.originalname).split(".");
  return `${Date.now()}.${fileName[0]}${extname(
    file.originalname,
  )}`;
}
