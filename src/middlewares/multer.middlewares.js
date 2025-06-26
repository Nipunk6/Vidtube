import multer from "multer";

//allowing disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb=callback
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    cb(null, file.originalname); // Using original name for simplicity
  },
});

export const upload = multer({
  storage,
});
