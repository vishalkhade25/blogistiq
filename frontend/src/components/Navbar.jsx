import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="flex justify-between items-center border-b-2 border-black px-5 py-4 mb-5 sticky top-0 bg-white z-50">
      <h1 className="text-2xl font-bold">
        BLOGISTIQ
      </h1>

      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-5 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "underline font-bold" : ""}`
          }
        >
          Home
        </NavLink>

        {token ? (
          <>
            <NavLink
              to="/myblogs"
              className={({ isActive }) =>
                `${isActive ? "underline font-bold" : ""}`
              }
            >
              My Blogs
            </NavLink>

            <NavLink
              to="/create-blog"
              className={({ isActive }) =>
                `${isActive ? "underline font-bold" : ""}`
              }
            >
              Create Blog
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${isActive ? "underline font-bold" : ""}`
              }
            >
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="border-2 px-2 py-1 rounded-lg bg-black text-white hover:text-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? "underline font-bold" : ""}`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${isActive ? "underline font-bold" : ""}`
              }
            >
              Signup
            </NavLink>
          </>
        )}
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-5 bg-white border rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          {token ? (
            <>
              <NavLink
                to="/myblogs"
                onClick={() => setMenuOpen(false)}
              >
                My Blogs
              </NavLink>

              <NavLink
                to="/create-blog"
                onClick={() => setMenuOpen(false)}
              >
                Create Blog
              </NavLink>

              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;