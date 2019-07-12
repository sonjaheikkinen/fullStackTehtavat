import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import RenderPersons from './components/RenderPersons'
import personService from './services/persons'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
          .then(() => {
            setNotificationMessage(`Updated ${newName}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .then(() => {
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
        .then(
        setPersons(persons.filter(person => {
        return person.id !== id
        })))
        .then(() => {
          setNotificationMessage(`Deleted ${name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App;
