import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import RenderPersons from './components/RenderPersons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const foundPerson = persons.filter(person => person.name === newName)
    if (foundPerson.length !== 0) {
      const updateAllowed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (updateAllowed) {
        personService
          .update(foundPerson[0].id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => {
              if (person.name === returnedPerson.name) {
                return returnedPerson
              } else {
                return person
              }
            }))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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
      return person.name.toLowerCase().includes(filterValue.toLowerCase())
    })

  const deletePerson = (id, name) => {
    const deleteAllowed = window.confirm(`Delete ${name}?`)
    if (deleteAllowed) {
      personService
        .deleteObject(id)
      setPersons(persons.filter(person => {
        return person.id !== id
      }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterValue={filterValue} handleFilterValueChange={handleFilterValueChange} />
      <h2>Add a new</h2>
      <AddPersonForm addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <RenderPersons namesToShow={namesToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App;
