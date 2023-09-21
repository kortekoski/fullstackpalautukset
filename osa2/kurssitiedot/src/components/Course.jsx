const Header = (props) => (
    <h1>
      {props.course}
    </h1>
  )
  
  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
  }
  
  const Total = (props) => (
    <p>
      <strong>
        Total of {props.parts
          .map(part => part.exercises)
          .reduce((acc, value) => (acc + value), 0)} exercises
      </strong>
    </p>
  )
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course