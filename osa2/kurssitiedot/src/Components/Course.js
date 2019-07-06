import React from 'react'

const Course = ({ name, parts }) => {
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <div>
            <h1>
                {course}
            </h1>
        </div>
    )
}

const Content = ({ parts }) => {
    const listParts = parts.map((part) =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
    )
    return (
        <div>
            {listParts}
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Total = ({ parts }) => {

    const countExercises = parts.reduce((sum, part) =>
        sum + part.exercises, 0)

    return (
        <p>
            <b>total of {countExercises} exercises</b>
        </p>
    )
}

export default Course