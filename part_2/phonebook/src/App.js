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
    
    if (!persons.some((person) => person.name === newName)) {
      const person = { name: newName, number: newNumber }
      personService
    .create(person)
    .then(newPerson => {   
      setPersons(persons.concat(newPerson));
    })
    } else {
      window.alert(`${newName} is already added to the phonebook.`);
    }
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
      <Numbers personsToShow={personsToShow}></Numbers>
    </div>
  );
};

export default App;
