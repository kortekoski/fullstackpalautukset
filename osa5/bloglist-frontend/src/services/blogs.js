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

export default { getAll, setToken, createBlog }