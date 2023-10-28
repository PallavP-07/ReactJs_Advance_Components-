import React from 'react'
import { InputNumber } from 'antd';
const Numberinput = ({ style, placeholder, bordered }) => {
    const onChange = (value) => {
    };
    return (
        <div>
            <InputNumber
                placeholder={placeholder}
                bordered={bordered}
                maxLength={25}
                style={style}
                min={1}
                max={10}
                onChange={onChange} />
        </div>
    )
}

export default Numberinput