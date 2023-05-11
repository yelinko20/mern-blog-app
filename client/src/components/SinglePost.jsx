import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { BASE_URL } from "../../apiConfig";
import {BsFillTrash3Fill} from "react-icons/bs"
import {FaEdit} from "react-icons/fa"
import { Audio } from "react-loader-spinner";

const SinglePost = () => {
  const { id } = useParams();
  console.log(id);
  const token = localStorage.getItem("token");
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const postPhoto = "http://localhost:4000/";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${BASE_URL}posts/${id}`);
        setPost(res.data);
        setIsLoading(false)
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}posts/${id}`);
      // Redirect to post list page after deletion
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };
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
    <div className="container mx-auto pt-32 pb-10 px-4 md:px-0">
      {post.image && (
        <img
          src={postPhoto + post.image}
          alt={post.title}
          className="w-full object-cover"
        />
      )}
      <div className="flex justify-between items-center">
        <h2 className="mt-4 text-4xl font-bold">{post.title}</h2>
        {token && (
          <div className="flex items-center gap-6">
            <button  onClick={handleDelete}>
              <BsFillTrash3Fill className="text-2xl"/>
            </button>
            <Link to={`/edit/${post._id}`}>
              <FaEdit className="text-2xl"/>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-4">{new Date(post.createdAt).toDateString()}</div>
      <p
        className="mt-4 text-sm"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </div>
  );
};

export default SinglePost;
