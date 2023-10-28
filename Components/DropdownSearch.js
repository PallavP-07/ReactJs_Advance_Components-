import React, { useState, useEffect } from "react";
import Select from "react-select";
import _ from 'lodash';
import { useTranslation } from "react-i18next";

export default function DropdownSearch({ handleSelect, selectedOptions = {}, optionList, placeholder, defaultValue, isClearable, isDisabled}) {
  const { t, i18n } = useTranslation();

    const [value, setvalue] = useState("");
    const [label, setlabel] = useState("");
    useEffect(() => {
        if (!_.isEmpty(selectedOptions)) {
            if (typeof selectedOptions === 'object') {
                setvalue(selectedOptions)
            } else {
                setlabel(selectedOptions);
            }
        }
    }, [selectedOptions]);


    return (
        <div className="app">
            <div className="dropdown-container">
                <Select
                    isDisabled={isDisabled}
                    styles={{ width: "100 %" }}
                    options={optionList}
                    placeholder={placeholder || t('SELECT')}
                    onChange={handleSelect}
                    defaultValue={defaultValue}
                    value={value}
                />
            </div>
        </div>
    );
}