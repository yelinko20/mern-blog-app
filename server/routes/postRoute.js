const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controller/postController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().slice(0, 10);
    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.route("/").get(getPosts).post(upload.single("image"), createPost);

router
  .route("/:id")
  .get(getSinglePost)
  .put(upload.single("image"), updatePost)
  .delete(deletePost);

module.exports = router;


