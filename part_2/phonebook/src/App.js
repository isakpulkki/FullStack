import { useState, useEffect } from 'react'
import NewNumber from "./components/NewNumber";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  const addName = (event) => {
    event.preventDefault();
    
    if (!persons.some((person) => person.name === newName)) {
      const person = { name: newName, number: newNumber }
      axios
    .post('http://localhost:3001/persons', person )
    .then(response => {   
      setPersons(persons.concat(response.data));
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
