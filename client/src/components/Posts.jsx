import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../apiConfig";
import { Audio } from "react-loader-spinner";


const PostList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const postPhoto = "http://localhost:4000/";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}posts`);
        setPosts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const extractFirst10Words = (content) => {
    const words = content.split(" ");
    return words.slice(0, 30).join(" ");
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
    <div className="grid container mx-auto md:grid-cols-2 gap-6 pt-32 px-4 sm:px-0 pb-10">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
          <Link to={`/${post._id}`}>
            {post.image && (
              <img
                src={postPhoto + post.image}
                alt={post.title}
                className="mb-4 rounded-lg"
              />
            )}
          </Link>
          <div className="flex items-center justify-between">
            <Link to={`/${post._id}`}>
              <h2 className="text-xl text-start font-bold  hover:underline">
                {post.title}
              </h2>
            </Link>
            <div>{new Date(post.createdAt).toDateString()}</div>
          </div>
          <p
            className="mt-2 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: extractFirst10Words(post.content) + "...",
            }}
          ></p>
          <Link to={`/${post._id}`}>
            <div className="mt-4 px-4 py-2 text-center bg-secondary rounded-lg hover:bg-secondary-dark transition-colors duration-200">
              Read More
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
