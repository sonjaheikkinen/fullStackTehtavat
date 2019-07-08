import React, { useState } from 'react';
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import RenderPersons from './components/AddPersonForm'

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterValue, setFilterValue] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const nameArray = persons.map(person => person.name)
    if (nameArray.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
    if (filterValue === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }
  
  const namesToShow = showAll
    ? persons
    : persons.filter((person) => {
      return person.name.includes(filterValue)
    })

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterValue={filterValue} handleFilterValueChange={handleFilterValueChange} />
      <h2>Add a new</h2>
      <AddPersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <RenderPersons namesToShow={namesToShow} />
    </div>
  )
}

export default App;
