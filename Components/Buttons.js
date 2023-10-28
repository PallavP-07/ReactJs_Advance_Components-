import React from 'react'
import { Button } from 'antd';
const Buttons = ({ style, text, className, onClick, value, size, disabled, backgroundColor, onChange, type }) => {
    return (
        <>
            <Button
                type={type}
                className={className}
                size={size}
                style={style}
                onClick={() => onClick()}
                disabled={disabled}
            >
                {text}
            </Button>
        </>
    )
}

export default Buttons;