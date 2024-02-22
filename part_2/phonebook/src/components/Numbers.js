const Numbers = (props) => {
  return (
    <div>
      <h3 >Numbers</h3>
      {props.personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        <button type="button" onClick={() => props.removePerson(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Numbers;
