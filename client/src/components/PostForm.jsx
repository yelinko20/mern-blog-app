import {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apiConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await axios.post(`${BASE_URL}posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      alert(error)
    }

    setTitle("");
    setContent("");
    setImage(null);
    navigate("/");
  };

  const BackToHome = () => {
    navigate("/");
  };
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ];

  const handleContenChange = (value) => {
    setContent(value)
  }

  return (
    <div className="w-full max-w-2xl mx-auto pt-20 px-4 md:px-0">
      <div className="bg-white rounded-lg shadow-md ">
        {/* {errorMessage && <span className="text-red-500">{errorMessage}</span>} */}
        <form onSubmit={handleSubmit} className="px-4 py-6">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image
            </label>
            <div className="h-60 border border-solid border-secondary rounded-lg overflow-hidden">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Post image"
                  className="h-full w-full object-cover"
                />
              ) : (
                <label
                  htmlFor="image"
                  className="flex items-center justify-center  w-full h-full text-gray-700 font-bold"
                >
                  Select an image
                </label>
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(event) => setImage(event.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-gray-700 font-bold mb-2"
            >
              Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              modules={{
                toolbar: toolbarOptions,
              }}
              onChange={handleContenChange}
              className="border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-secondary font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Create Post
            </button>
            <button
              onClick={BackToHome}
              className="bg-secondary font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PostForm;
