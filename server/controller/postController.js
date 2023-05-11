const Post = require("../models/postModel");
const getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((error) => console.error(error));
};

const createPost = async(req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? req.file.path : "";
  const newPost = new Post({
    title,
    content,
    image: imagePath,
  });
  // newPost.save();
  try {
    const savedPost = await newPost.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
};
const getSinglePost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((error) => console.error(error));
};

const updatePost = (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? req.file.path : req.body.image;
  Post.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
      image: imagePath,
    },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((error) => console.error(error));
};
const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Post deleted." }))
    .catch((error) => console.error(error));
};

module.exports = {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
};
