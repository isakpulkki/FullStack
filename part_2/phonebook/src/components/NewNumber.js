const NewNumber = (props) => {
  return (
    <div>
      <h3>Add a new number</h3>
      <form onSubmit={props.addName}>
        <div>
          <p>Name: </p>
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          <p>Number: </p>
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <br></br>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewNumber;
