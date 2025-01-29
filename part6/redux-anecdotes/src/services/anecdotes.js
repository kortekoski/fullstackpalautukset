import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const get = async (id) => {
    const anecdoteUrl = baseUrl + '/' + id
    const response = await axios.get(anecdoteUrl)
    return response.data
}

const createNew = async (content) => {
    const anecdoteObject = {content: content, votes: 0}
    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

const postVote = async (id) => {
    const votedAnecdote = await get(id)
    const newAnecdote = {...votedAnecdote, votes: votedAnecdote.votes + 1}
    const anecdoteUrl = baseUrl + '/' + id
    const response  = await axios.put(anecdoteUrl, newAnecdote)
    return response.data
}

export default { getAll, get, createNew, postVote}