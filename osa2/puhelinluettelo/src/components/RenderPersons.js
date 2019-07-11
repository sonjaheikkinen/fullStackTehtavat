import React from 'react'

const RenderPersons = ({ namesToShow, deletePerson }) => {
    return namesToShow.map(person =>
        <Person key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id, person.name)}
            />
        )
}

const Person = ({person, deletePerson}) => {
    return (
        <li>
        {person.name} {person.number}
        <button onClick={deletePerson}>delete</button>
        </li>
    )
}

export default RenderPersons