import { useState } from "react"
import { likeBlog } from '../services/blogs'


const Blog = ({ blog }) => {

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const getUser = () => {
    if (Object.keys(blog).includes('user')){
      return blog.user.username
    } else {
      return 'user not defined'
    }
  }

  const [showInfo, setShowInfo] = useState(false)
  const username = getUser()
  
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
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>
          {username}
        </div>
        <button onClick={() => setShowInfo(false)}>hide info</button>
      </div>  
    )
  }
}

export default Blog