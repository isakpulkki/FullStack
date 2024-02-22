import { useState, useEffect } from 'react'
import NewNumber from "./components/NewNumber";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(dbPersons => {
        setPersons(dbPersons)
      })
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber }
    if (!persons.some((person) => person.name === newName)) {
      personService
    .create(newPerson)
    .then(newPerson => {   
      setPersons(persons.concat(newPerson));
    })

    } else {
      const oldPerson = persons.find(person => person.name === newName)
      personService
    .update(oldPerson.id, newPerson)
    .then(updatedPerson => {   
        setPersons(persons.map(person => person.id !== oldPerson.id ? person : updatedPerson))
    }
    )
  }
};

  const removePerson = (personId) => {
    personService
    .remove(personId);
    setPersons(persons.filter(person => person.id !== personId));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterNumbers = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterNumbers={filterNumbers}></Filter>
      <NewNumber
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></NewNumber>
      <Numbers personsToShow={personsToShow} removePerson={removePerson}></Numbers>
    </div>
  );
};

export default App;
