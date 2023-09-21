import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message, type }) => {
  

  if (message === null) {
    return null
  }

  if (type === 'ok') {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  if (type === 'error') {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <p>
        filter shown names with  
        <input
          value={value}
          onChange={onChange}
        />
      </p>
    </div>
  )
}

const Persons = ({ persons, filter, destroy }) => {
  const shownPersons = filter != ''
    ? persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    : persons

  return (
    <div>
      {shownPersons.map(person => 
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => destroy(person.id)}>delete</button>
        </p>
      )}
    </div>
  )
}

const PersonForm = ({ onSubmit, nameValue, onNameChange, numberValue, onNumberChange}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: 
          <input 
            value={nameValue}
            onChange={onNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={numberValue}
            onChange={onNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState()

  useEffect (() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newPerson.name)){
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
        const oldPerson = persons.find(p => p.name === newPerson.name)

        personService
          .update(oldPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setNotificationType('ok')
            setNotification(`The number of ${updatedPerson.name} has been changed.`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else if (newNumber === '') {
      alert('Please set a number.')
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationType('ok')
          setNotification(`${returnedPerson.name} was added to the phonebook!`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const destroyPerson = (id) => {
    const deletedPersonName = persons.find(p => p.id === id).name

    if (window.confirm(`Remove ${deletedPersonName}?`)) {
      personService
        .destroy(id)
        .then(deletedPerson => {
          setNotificationType('ok')
          setNotification(`${deletedPersonName} has been removed from the phonebook.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setNotificationType('error')
          setNotification(`${deletedPersonName} has already been removed from the server.`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType}/>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} destroy={destroyPerson}/>
    </div>
  )

}

export default App