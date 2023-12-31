import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";

function App() {
  const [country, setCountry] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("effect is run, ");

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        console.log(response.data);
        setCountry(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <label>
        find countries <input value={name} onChange={handleSearch} />
      </label>
      <div>
        <Country name={name} country={country} key={country.id} />
      </div>
    </div>
  );
}

export default App;
