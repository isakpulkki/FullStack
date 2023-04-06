import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const App = () => {
  const name = 'Half Stack application development'
  const parts = [{
    part: 'Fundamentals of React', exercise: 10},
    {part: 'Using props to pass data', exercise: 7}, 
    {part: 'State of a component', exercise: 14}]
  
  return (
    <div>
      <Header name = {name}/>
      <Content parts = {parts}/>
      <Total exercises = {parts[0].exercise + parts[1].exercise + parts[2].exercise}/>
    </div>
  )
}

export default App