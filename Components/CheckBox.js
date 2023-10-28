import React, { useState } from 'react';
import { Checkbox } from 'antd';

const CheckBox = ({ text, style, index, checked, onChange,value }) => {
    return (
        <>
            <Checkbox
                onChange={onChange}
                value={value}
                checked={checked}
                style={style}
            >
                {text}

            </Checkbox>
        </>
    )
}

export default CheckBox