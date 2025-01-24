import { useSelector, useDispatch } from "react-redux"
import { createVote } from "../reducers/anecdoteReducer"
import { createNotification, killNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const style = {
        marginBottom: 10
    }

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        const votedAnecdote = anecdotes.find(
            (a) => a.id === id 
        )
        const notificationText = 'you voted for ' + '"' + votedAnecdote.content + '"'

        dispatch(createVote(id))
        dispatch(createNotification(notificationText))
        setTimeout(() => {
            dispatch(killNotification())
        }, 5000)
    }
    
    return (
        <div style={style}>
            {anecdotes
                .filter((a) => a.content.includes(filter))
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList