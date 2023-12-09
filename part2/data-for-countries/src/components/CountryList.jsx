import { useState } from "react";
import CountryDetail from "./CountryDetail";

/* eslint-disable react/prop-types */
export default function CountryList({ country }) {
  const [show, setShow] = useState(null);

  const handleShowClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <div>
        {show && <CountryDetail key={country.name.common} country={country} />}
        {country.name.common}{" "}
        <button onClick={handleShowClick}>{!show ? "show" : "hide"}</button>
      </div>
    </div>
  );
}
