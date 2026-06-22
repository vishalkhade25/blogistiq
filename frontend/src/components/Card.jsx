import React from "react";

const Card = ({ blog }) => {
  return (
    <div className="card-container border-2 rounded-lg border-black relative w-80 h-56">
      <div className="card p-3 flex flex-col h-full">

        <div className="mb-2">
          <p className="text-lg font-semibold">
            {blog.author?.name}
          </p>

          <p className="text-sm font-light">
            @{blog.author?.username}
          </p>
        </div>

        <div>
          <p className="text-xl font-bold">
            {blog.title}
          </p>

          <p className="text-base">
            {blog.content}
          </p>
        </div>

        <div className="absolute bottom-2">
          <p className="text-xs">
            Created:
            {" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          <p className="text-xs">
            Updated:
            {" "}
            {new Date(blog.updatedAt).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Card;