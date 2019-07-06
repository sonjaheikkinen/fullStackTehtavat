import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
    const [mostVotes, setMostVotes] = useState(0)

    const selectAnecdote = () => {
        return (setSelected(Math.floor(Math.random() * 6)))
    }

    const vote = () => {
      let copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
      if (votes[selected] >= votes[mostVotes]) {
        setMostVotes(selected)
      }
    }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
      <Button onClick={selectAnecdote} text='next anecdote' />
      <Button onClick={vote} text='vote' />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({onClick, text}) => {
  return (
  <button onClick={onClick}>{text}</button>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
