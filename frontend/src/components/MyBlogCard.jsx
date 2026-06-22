const MyBlogCard = ({ blog, onDelete, onEdit }) => {
  return (
    <div className="card-container border-2 rounded-lg border-black relative w-80 h-56">
      <div className="card p-3 flex flex-col h-full">
        <div className="mb-2">
          <p className="text-lg font-semibold">{blog.author?.name}</p>

          <p className="text-sm font-light">@{blog.author?.username}</p>
        </div>

        <div>
          <p className="text-xl font-bold">{blog.title}</p>

          <p className="text-base">{blog.content}</p>
        </div>

        <div className="buttons flex gap-5 my-2">
          <button onClick={()=> onEdit(blog._id)} className="border-2 border-black bg-black text-white px-3 py-1.5 hover:border-orange-200 rounded-lg">Edit</button>

          <button onClick={() => onDelete(blog._id)} className="border-2 border-black px-3 py-1.5 hover:border-orange-200 rounded-lg">Delete</button>
        </div>

        <div className="absolute bottom-2">
          <p className="text-xs">
            Created: {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          <p className="text-xs">
            Updated: {new Date(blog.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
