import { useState, useEffect } from "react";
import axios from "axios";
import CountriesToShow from "./components/CountriesToShow";

const App = () => {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);
  const handleChange = (event) => {
    setName(event.target.value);
  };
  if (!countries) {
    return null;
  }
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(name.toLowerCase())
  );
  return (
    <div>
      <p>
        Type the name of the country:
        <input value={name} onChange={handleChange} />
      </p>
      <CountriesToShow countriesToShow={countriesToShow} setName={setName} />
    </div>
  );
};

export default App;
