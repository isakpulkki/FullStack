import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (<div>
    <h1>Give feedback</h1>
    <Button handleClick={() => setGood(good + 1)} text="Good" />
    <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
    <Button handleClick={() => setBad(bad + 1)} text="Bad" />

    <h1>Statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
  </div>
  );
}

const Statistics = (props) => {
  const sum = props.good - props.bad
  const count = props.good + props.neutral + props.bad
  const average = sum / count
  const positive = (props.good / (props.good + props.neutral + props.bad))

  if ((count) === 0){
  
    return (
      <div>
        No feedback given
      </div>
    );   
  };
  return (
    <table>
    <StatisticLine name = "Good" value={props.good}></StatisticLine>
    <StatisticLine name = "Neutral" value={props.neutral}></StatisticLine>
    <StatisticLine name = "Bad" value={props.bad}></StatisticLine>
    <StatisticLine name = "Average" value={average}></StatisticLine>
    <StatisticLine name = "Positive" value={positive + "%"}></StatisticLine>
    </table>
  );
}

const StatisticLine = props => <tr><td>{props.name}:</td> <td>{props.value}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App;
