import Country from "./Country";

const CountriesToShow = ({ countriesToShow, setName }) => {
  if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    return (
      <div>
        {countriesToShow.map((country) => (
          <Country key={country.cca2} country={country} setName={setName} />
        ))}
      </div>
    );
  } else if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} fullInfo={true} />;
  }
  return <p>Found too many matches, specify your filter.</p>;
};

export default CountriesToShow;
