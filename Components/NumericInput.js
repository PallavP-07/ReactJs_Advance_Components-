import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import _ from 'lodash'

const Numericinput = (props) => {
    const { value, onChange, onBlur } = props;
    const [scorePoints, setScorePoints] = useState("");

    useEffect(() => {
        if (value) {
            setScorePoints(value);
        }else {
            setScorePoints("");
        }
    }, [value]);
    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;

        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            setScorePoints(inputValue)
            onChange(inputValue);
        }
    };
    const handleBlur = (e) => {
        const { value: inputValue } = e.target;
        setScorePoints(inputValue)
        onBlur(inputValue);
    }
    return (
        <Input
            {...props}
            onChange={handleChange}
            maxLength={1}
            onBlur={handleBlur}
            value={scorePoints}
        />
    );
};

const NumericInput = ({ style, handleSelect, value = {}, handleSelectBlur ,disabled}) => {
    const [numericValue, setnumericValue] = useState("");
    useEffect(() => {
        if (!_.isEmpty(value)) {
            setnumericValue(value?.point);
        }else {
            setnumericValue("")
        }
    }, [value]);
    return (
        <Numericinput
            style={style}
            value={numericValue}
            onChange={handleSelect}
            onBlur={handleSelectBlur}
            disabled={disabled}
        />
    );
};

export default NumericInput;