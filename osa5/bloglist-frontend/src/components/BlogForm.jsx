import { useState } from "react"

const BlogForm = ({ handleBlogForm }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const resetStates = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
        setVisible(false)
    }

    const createBlog = (event) => {
        event.preventDefault()

        handleBlogForm(title, author, url)

        resetStates()
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => {setVisible(true)}}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={() => {setVisible(false)}}>cancel</button>
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
      </div>
    )
}

export default BlogForm