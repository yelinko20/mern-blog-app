import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showMenu, setShowMenu] = useState(false);
  const [navScroll, setNavScroll] = useState(false);
  useEffect(() => {
    function scrollActive() {
      setNavScroll(window.scrollY > 20);
    }
    window.addEventListener("scroll", scrollActive);
    return () => window.removeEventListener("scroll", scrollActive);
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  function handleBlur() {
    setShowMenu(!showMenu);
  }

  return (
    <header
      className={`fixed w-full top-0 left-0 z-20 p-4 ${
        navScroll && "bg-White shadow-md"
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-2xl font-medium">Blogpedia</div>
        </Link>
        <div className="sm:hidden" onBlur={handleBlur}>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full  bg-secondary"
          >
            <HiMenuAlt4 className="text-2xl" />
          </button>
          {showMenu && (
            <div className="absolute top-full right-4 py-2 bg-white rounded-lg shadow-md">
              {!token ? (
                <>
                  <Link to="register" className="block px-4 py-2">
                    Register
                  </Link>
                  <Link to="login" className="block px-4 py-2">
                    Log In
                  </Link>
                </>
              ) : (
                <>
                  <Link to="upload" className="block px-4 py-2">
                    Create Post
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-6">
          {!token ? (
            <>
              <Link to="register">
                <div className="px-4 py-2 bg-secondary rounded-lg">
                  Register
                </div>
              </Link>
              <Link to="login">
                <div className="px-4 py-2 bg-secondary rounded-lg">Log In</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="upload" className="px-4 py-2 bg-secondary rounded-lg">
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-secondary rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
