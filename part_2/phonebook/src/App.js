import { useState, useEffect } from "react";
import NewNumber from "./components/NewNumber";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService.getAll().then((dbPersons) => {
      setPersons(dbPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.some((person) => person.name === newName)) {
      const oldPerson = persons.find((person) => person.name === newName);
      personService
        .update(oldPerson.id, newPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== oldPerson.id ? person : updatedPerson
            )
          );
          setMessage(newName + "'s number changed.");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
            setError(error.response.data.error);
            setTimeout(() => {
              setError(null);
            }, 5000);
        });
    } else {
      personService
        .create(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setMessage(newName + "'s number added.");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 5000);
          return;
        });
    }
  };

  const removePerson = (personId) => {
    personService.remove(personId);
    setPersons(persons.filter((person) => person.id !== personId));
    setMessage("Number deleted.");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
      <Notification message={message} error={error} />
      <Filter filter={filter} filterNumbers={filterNumbers}></Filter>
      <NewNumber
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></NewNumber>
      <Numbers
        personsToShow={personsToShow}
        removePerson={removePerson}
      ></Numbers>
    </div>
  );
};

export default App;
