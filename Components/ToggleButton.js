import React, { useState } from 'react'
export default function ToggleButton({ togglebtn, handleSelect }) {

    const SelectedStyle = {
        backgroundColor: "#F48220",
        color: "#FFFFFF"
    }

    return (
        <>
            {togglebtn.map((btn, index) => {
                return (
                    <>
                        <span className='Toggle-Button px-4 border align-self-center py-1' style={btn.visible == true ? SelectedStyle : null} onClick={() => { handleSelect(btn); }}>
                            {btn.name}
                        </span></>
                )
            })}
        </>
    )
}