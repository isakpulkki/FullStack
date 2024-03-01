const Country = ({ country, setName, fullInfo }) => {
  if (fullInfo) {
    const languages = [];
    for (var index in country.languages) {
      languages.push(country.languages[index]);
    }
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Spoken languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img id="flag" src={country.flags.png} width={150} alt="flag" />
      </div>
    );
  }
  return (
    <p>
      {country.name.common}
      <button onClick={() => setName(country.name.common)}>Show</button>
    </p>
  );
};

export default Country;
