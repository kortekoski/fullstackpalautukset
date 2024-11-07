import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  newToken === null
    ? token = null
    : token = `Bearer ${newToken}`

  console.log(`CURRENT TOKEN IS ${token}`)
}

const createBlog = async newBlog => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }

  try {
    const response = await axios.post(baseUrl, newBlog, {headers: headers})

    return response.data
  } catch (exception) {
    throw new Error(exception.response.data.error)
  }
}

const likeBlog = async blog => {
  const blogUrl = baseUrl + '/' + blog.id
  const newBlog = {...blog, likes: blog.likes + 1}

  try {
    const response = await axios.put(blogUrl, newBlog)
  } catch (exception) {
    throw new Error(exception)
  }
}

const deleteBlog = async blog => {
  const headers = { 'Authorization': token }
  const blogUrl = baseUrl + '/' + blog.id

  try {
    const response = await axios.delete(blogUrl, {headers: headers})
  } catch (exception) {
    throw new Error(exception.response.data.error)
  }
}

export { likeBlog }
export { deleteBlog }
export default { getAll, setToken, createBlog }