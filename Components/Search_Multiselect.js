import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
const Search_Multiselect = ({ options, value, onChange }) => {
    return (
        <>
            <MultiSelect
                hasSelectAll={false}
                options={options}
                value={value}
                closeOnChangedValue={true}
                onChange={onChange}
                labelledBy="Select Leagues......"
            />
        </>
    )
}

export default Search_Multiselect