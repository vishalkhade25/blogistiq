import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams, useNavigate } from 'react-router-dom'

const EditBlog = () => {

  const {id} = useParams()

  const navigate = useNavigate()


  const [formData,setFormData] = useState({
    title : "",
    content : ""
  })
  const getSingleBlog = async () =>{
    try {
      const response = await axios.get(
        `http://localhost:4000/blogs/singleblog/${id}`
      )
      console.log(response.data)
      setFormData({
        title : response.data.singleBlog.title,
        content : response.data.singleBlog.content
      })
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  const {token} = useContext(AuthContext);

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
    // console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/blogs/updateBlog/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      alert(response.data.message)
       navigate("/myblogs")
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  useEffect(()=>{
    getSingleBlog()
  },[id])

  return (
    <div>
      <div className="m-2 p-4 flex flex-col">
      <h1 className="text-2xl font-bold px-4 border-b-2 border-black">
        Edit Your Blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-4 my-4 mx-2 gap-2"
      >
        <label htmlFor="title" className="font-bold">
          Title{" "}
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="px-2 outline py-1 rounded w-1/2"
        />
        <label htmlFor="content" className="font-bold">
          Content{" "}
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="Enter content"
          value={formData.content}
          onChange={handleChange}
          className="px-2 outline w-1/2 py-1 rounded h-48"
        ></textarea>

        <button type="submit" className="border-2 border-black w-36 rounded bg-gray-800 text-white py-1 hover:border-orange-300">
          Update
        </button>
      </form>
    </div>
    </div>
  )
}

export default EditBlog
