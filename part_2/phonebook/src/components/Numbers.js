const Numbers = (props) => {
  return (
    <div>
      <h3 >Numbers</h3>
      {props.personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Numbers;
