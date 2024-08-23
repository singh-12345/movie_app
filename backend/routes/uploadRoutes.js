
import path from "path";
import express from "express";
import multer from "multer";


const app = express();
app.use(express.json());

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});


const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = path.extname(file.originalname);
    const mimetype = file.mimetype;
  
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Images only"), false);
    }
  };
  

  const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});


router.post("/movies", (req, res) => {
  const { name, year, detail, cast, genre, image } = req.body;

  // Assuming you have a Movie model and you're saving it to a database
  const newMovie = new Movie({ name, year, detail, cast, genre, image });
  
  newMovie.save()
    .then(movie => res.status(201).json(movie))
    .catch(err => res.status(400).json({ error: err.message }));
});

export default router;