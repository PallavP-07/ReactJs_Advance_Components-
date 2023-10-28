import React from 'react'
import { Input, Select } from 'antd';
const InputBox = ({ style, placeholder, bordered, allowClear,prefix,size,onChange,maxLength,minLength,status,value,disabled}) => {
    return (
        <div>
            <Input
                allowClear={allowClear}
                placeholder={placeholder}
                bordered={bordered}
                maxLength={maxLength}
                minLength={minLength}
                style={style}
                status={status}
                prefix={prefix}
                size={size}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
        </div>
    )
}

export default InputBox