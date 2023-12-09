import CountryDetail from "./CountryDetail";
import CountryList from "./CountryList";

/* eslint-disable react/prop-types */
export default function Country({ name, country }) {
  let filtered = [];

  console.log(filtered);

  if (name.length > 0) {
    filtered = country.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
  } else {
    return null;
  }

  if (filtered.length > 10) {
    return <div>Too many matches, be more specific</div>;
  } else if (filtered.length === 1) {
    console.log(filtered.flag);
    return filtered.map((country) => (
      <CountryDetail key={country.name.common} country={country} />
    ));
  } else {
    return filtered.map((country) => (
      <CountryList key={country.name.common} country={country} />
    ));
  }
}
