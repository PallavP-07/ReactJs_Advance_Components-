import { Input } from 'antd';
import React from 'react';

const TextArea = ({ placeholder, maxLength, rows }) => {
    const { TextArea } = Input;
    return (
        <>
            <TextArea
                showCount
                placeholder={placeholder}
                maxLength={maxLength}
                autoSize={{ minRows: 4, maxRows: 6}} /></>
    )
}

export default TextArea