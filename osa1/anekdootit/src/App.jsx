import { useState } from 'react'
const Header = ({ text }) => (<h1>{text}</h1>)

const Anecdote = ({ anecdote, votes }) => {
  if (votes === 1){
    return (
      <p>
        {anecdote} <br />
        has {votes} vote
      </p>
    )
  }

  return (
    <p>
      {anecdote} <br />
      has {votes} votes
    </p>
  )
}

const Button = ({ handleClick, text }) => (<button onClick={handleClick}>{text}</button>)

const Favorite = ({ anecdotes, points }) => {
  const biggestVotes = Math.max(...points)

  if (biggestVotes === 0) {
    return (
      <p>
        No votes yet
      </p>
    )
  }

  const biggestVotesIndex = points.indexOf(biggestVotes)

  return (
    <Anecdote anecdote={anecdotes[biggestVotesIndex]} votes={biggestVotes}/>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    const range = anecdotes.length

    const updatedAnecdote = Math.floor(Math.random() * range)
    setSelected(updatedAnecdote)
  }

  const voteAnecdote = () => {
    const currentAnecdote = selected

    const copy = [...points]
    copy[currentAnecdote] += 1

    setPoints(copy)
  }

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={() => voteAnecdote()} text={"vote"}/>
      <Button handleClick={() => nextAnecdote()} text={"next anecdote"}/>
      <br />
      <Header text={"Anecdote with the most votes"} />
      <Favorite anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App