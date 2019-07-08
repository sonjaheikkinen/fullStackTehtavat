import React from 'react'

const RenderPersons = ({ namesToShow }) => {
    return namesToShow.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>)
}

export default RenderPersons