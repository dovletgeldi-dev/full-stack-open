/* eslint-disable no-undef */
import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function CountryDetail({ country }) {
  const [selectedWeather, setSelectedWeather] = useState(null);
  useEffect(() => {
    const api_key = import.meta.env.REACT_WEATHER_API_KEY;
    console.log(api_key);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        setSelectedWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (selectedWeather === null) {
    return null;
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <div>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          width={150}
          height={150}
        />
      </div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {}</p>
      <div>{/* <img src="" alt="" /> */}</div>
      <p>Wind: {}</p>
    </div>
  );
}
