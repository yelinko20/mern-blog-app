import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../apiConfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Audio } from "react-loader-spinner";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)
  const postPhoto = "http://localhost:4000/";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const {data} = await axios.get(`${BASE_URL}posts/${id}`);
        // console.log(res)
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await axios.put(`${BASE_URL}posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post updated successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-7xl">
        <Audio
          height="100"
          width="100"
          color="#000000"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto pt-20 px-4 md:px-0">
      <div className="bg-white rounded-lg shadow-md">
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
            <div
              className="h-60 border border-solid border-secondary rounded-lg overflow-hidden"
              onClick={handleImageClick} // Handle image click event
            >
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Post image"
                  className="h-full w-full object-cover"
                />
              ) : post.image ? (
                <img
                  src={postPhoto + post.image}
                  alt="Post image"
                  className="h-full w-full object-cover"
                />
              ) : (
                <label
                  htmlFor="imageInput"
                  className="flex items-center justify-center w-full h-full text-gray-700 font-bold"
                >
                  Select an image
                </label>
              )}
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange} // Handle image change event
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
              Update Post
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

export default EditPost;
