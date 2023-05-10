import Part from "./Part"

const Content = ({list}) => {
    return (
      <>
        <Part name = {list[0].name} exercises = {list[0].exercises}/>
        <Part name = {list[1].name} exercises = {list[1].exercises}/>
        <Part name = {list[2].name} exercises = {list[2].exercises}/>
      </>
    )
  }

export default Content