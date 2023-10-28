import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
const PasswordInputbox = ({ placeholder, style, allowClear,onChange,value,maxLength }) => {
    return (
        <div>
            <Input.Password
                allowClear={allowClear}
                value={value}
                maxLength={maxLength}
                style={style}
                placeholder={placeholder}
                onChange={onChange}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />  
        </div>
    )
}

export default PasswordInputbox