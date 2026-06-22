import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {

  const [details, setDetails] = useState({
    name:"",
    username : "",
    email:""
  });

  const [total, setTotal] = useState(0)
  const navigate = useNavigate();

  const {token,setToken} = useContext(AuthContext);

  const getMyProfile = async () =>{
    try {
      const response = await axios.get(
        "http://localhost:4000/accounts/profile",
        {
          headers:{
            Authorization : `Bearer ${token}`
          }
        }
      )
      setDetails({
        name : response.data.user.name,
        username : response.data.user.username,
        email : response.data.user.email,
      }

      )
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  const totalBlogs = async () =>{
    try {
      const response = await axios.get("http://localhost:4000/blogs/myBlogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotal(response.data.myBlogs.length)
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

   const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  useEffect(() => {
  if (token) {
    getMyProfile();
    totalBlogs();
  }
}, [token]);

  return (
    <div className=" border-2 border-black lg:w-1/5 flex flex-col justify-between m-4 items-center h-auto mx-auto my-3 bg-white max-lg:w-1/2 md:w-1/3">
     <h1 className="text-xl font-bold p-2 gap-1 border-b-2 border-black">Your Account</h1>
     <div className="flex flex-col items-center p-2 border-b-2 border-black">
      <p className="text-lg font-semibold">{details.name}</p>
      <p className="text-sm font-normal">{details.username}</p>
      <p className="text-xs font-normal">{details.email}</p>
     </div>
     <div className="flex flex-col items-start justify-start p-2 gap-2">
      <p className="text-base font-normal w-full hover:bg-orange-100 px-3 py-1">Total Blog Posted : {total}</p>
      <p onClick={()=>{navigate("/myblogs")}} className="text-base font-normal w-full hover:bg-orange-100 px-3 py-1">See Your Blogs</p>
      <p onClick={()=>{handleLogout()}} className="text-base font-normaltext-base font-normal w-full hover:bg-orange-100 px-3 py-1">Logout</p>
     </div>
    </div>
  )
}

export default Profile
