import React, { useState } from "react";
import "../../../../Assets/Styles/Groupstage.css";
import ReactFlagsSelect from "react-flags-select";

const DropDownForTems = () => {
  const [select, setSelect] = useState("SE");
  const onSelect = (code) => setSelect(code);
  return (
    <>
      <div>
        <ReactFlagsSelect
          selected={select}
          onSelect={onSelect}
          countries={["US", "GB"]}
          optionsSize={14}
          selectedSize={14}
          className="menu-flags"
          selectButtonClassName="menu-flags-button"
        />
      </div>
    </>
  );
};

export default DropDownForTems;
