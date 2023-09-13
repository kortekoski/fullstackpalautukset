import { useState } from 'react'

const Header = ({ text }) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return( 
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  if (good + neutral + bad === 0) {
    return (
      <p>Palautetta ei ole vielä annettu.</p>
    )
  }

  const keskiarvo = () => ((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad))

  const positiiviset = () => (good / (good + neutral + bad)) * 100 + " %"

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={"Positiivisia:"} value={good} />
          <StatisticLine text={"Neutraaleja:"} value={neutral} />
          <StatisticLine text={"Negatiivisia:"} value={bad} />
          <StatisticLine text={"Yhteensä:"} value={good + neutral + bad} />
          <StatisticLine text={"Keskiarvo:"} value={good + neutral + bad === 0 ? 0 : keskiarvo()} />
          <StatisticLine text={"Positiivisia:"} value={good === 0 ? 0 : positiiviset()}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"Anna palautetta"}/>
      <Button handleClick={() => setGood(good + 1)} text={"Hyvä"}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={"Ihan ok"}/>
      <Button handleClick={() => setBad(bad + 1)} text={"Huono"}/>
      <br />
      <Header text={"Palautetilastot"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App