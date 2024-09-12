import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/posts")
      .then((response) => setPosts(response.data.posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const addPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      console.error("Both title and body are required");
      return;
    }

    axios
      .post("https://dummyjson.com/posts/add", newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", body: "" });
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  const saveEdit = (id) => {
    if (!editTitle.trim() || !editBody.trim()) {
      console.error("Both title and body are required");
      return;
    }

    axios
      .put(`https://dummyjson.com/posts/${id}`, {
        title: editTitle,
        body: editBody,
      })
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post.id === id ? response.data : post
          )
        );
        setEditingPost(null);
        setEditTitle("");
        setEditBody("");
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const deletePost = (id) => {
    axios
      .delete(`https://dummyjson.com/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post.id !== id)))
      .catch((error) => console.error("Error deleting post:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Post Title"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          placeholder="Post Body"
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={addPost}
          className="bg-blue-500 text-white p-2"
        >
          Add Post
        </button>
      </div>

      <ul className="mt-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col border-b py-4 mb-2"
          >
            {editingPost === post.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-2 mb-2 w-full"
                  placeholder="Post Title"
                />
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="border p-2 mb-2 w-full"
                  placeholder="Post Body"
                />
                <button
                  onClick={() => saveEdit(post.id)}
                  className="bg-blue-500 text-white px-4 py-2 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-gray-500 text-white px-4 py-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.body}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => {
                      setEditingPost(post.id);
                      setEditTitle(post.title);
                      setEditBody(post.body);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="bg-red-500 text-white px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
