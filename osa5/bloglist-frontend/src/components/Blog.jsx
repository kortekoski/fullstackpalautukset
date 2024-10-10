import { useState } from "react"

const Blog = ({ blog }) => {

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const [showInfo, setShowInfo] = useState(false)
  
  if (!showInfo) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}  
        <button onClick={() => setShowInfo(true)}>show info</button>
      </div>  
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
        </div>
        <div>
         {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={() => console.log('like')}>like</button>
        </div>
        <div>
          {blog.user.username}
        </div>
        <button onClick={() => setShowInfo(false)}>hide info</button>
      </div>  
    )
  }
}

export default Blog