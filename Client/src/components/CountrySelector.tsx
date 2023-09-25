import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

function CountrySelector({ application, setApplication }) {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
    setApplication({ ...application, country: value.label });
  };

  return <Select options={options} value={value} onChange={changeHandler} />;
}

export default CountrySelector;
