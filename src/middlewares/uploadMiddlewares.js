import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("./public/avatars"));
  },
  filename: (req, file, callback) => {
    const [fileName, extension] = file.originalname.split(".");
    callback(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

export const uploadMiddleware = multer({ storage });
