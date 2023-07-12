const Filter = (props) => {
    return (
      <div>
        Show only names with <input value={props.filter} onChange={props.filterNumbers} />
      </div>
    );
  };
  
  export default Filter;
  