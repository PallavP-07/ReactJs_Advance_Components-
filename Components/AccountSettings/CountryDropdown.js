import { indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { CountryCodes } from "../country";

export default function DropdownSearchForCountry(props) {
  const [selectedOptions, setSelectedOptions] = useState();
  const [optionList, setoptionList] = useState([]);
  const [def, setDef] = useState()


  const MapCountrylist = () => {
    CountryCodes.map((val) => {
      let obj = {
        value: val.name,
        label: val.name,
      };
      optionList.push(obj);
      setoptionList(optionList);
    });
  };

  useEffect(() => {
    setDef({
      value: localStorage.getItem("country"),
      label: localStorage.getItem("country")
    })
    MapCountrylist();
  }, []);

  function handleSelect(data) {
    props.setCountry(data.label);
    setSelectedOptions(data)
  }

  return (
    <div className="app">
      <div className="dropdown-container">
        {
          props.def.value === undefined ? null :
            <Select
              options={optionList}
              defaultValue={def}
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
            />
        }
      </div>
    </div>
  );
}
