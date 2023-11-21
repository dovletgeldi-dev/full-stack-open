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
    return (
      <div>
        {filtered.map((country, index) => (
          <div key={index}>
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
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {" "}
      {filtered.map((country, index) => (
        <div key={index}>{country.name.common}</div>
      ))}
    </div>
  );
}
