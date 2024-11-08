import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlogForm }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const resetStates = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const createBlog = (event) => {
        event.preventDefault()

        handleBlogForm(title, author, url)

        resetStates()
    }

    return (
      <div>
        <h3>Create blog</h3>
        <form onSubmit={createBlog}>
          <div>
              Title:
                  <input
                  type="text"
                  value={title}
                  name="Title"
                  onChange={event => setTitle(event.target.value)}
                  />
          </div>
          <div>
              Author:
                  <input
                  type="text"
                  value={author}
                  name="Author"
                  onChange={event => setAuthor(event.target.value)}
                  />
          </div>
          <div>
              URL:
                  <input
                  type="text"
                  value={url}
                  name="Url"
                  onChange={event => setUrl(event.target.value)}
                  />
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    )
}

BlogForm.propTypes = {
  handleBlogForm: PropTypes.func.isRequired
}

export default BlogForm