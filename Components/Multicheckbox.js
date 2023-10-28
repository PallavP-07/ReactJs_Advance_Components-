import React, { useState } from 'react'
import manchester from "../Assets/Images/manchester.svg"
import afc from "../Assets/Images/afc.svg"
import avfc from "../Assets/Images/avfc.svg"
import brighton from "../Assets/Images/brighton.svg"
import football from "../Assets/Images/football.svg"
import watford from "../Assets/Images/watford.svg"

export const Multicheckbox = () => {

    const [checked, setChecked] = useState([false, false, false]);
    const [sideMenus, setSideMenus] = useState([
        {
            img: manchester,
            id: 1,
            checked: false
        },
        {
            img: afc,
            id: 2,
            checked: false
        },
        {
            img: avfc,
            id: 3,
            checked: false
        },
        {
            img: brighton,
            id: 4,
            checked: false
        },
        {
            img: football,
            id: 5,
            checked: false
        },
        {
            img: watford,
            id: 6,
            checked: false
        },
        {
            img: brighton,
            id: 7,
            checked: false
        },
        {
            img: football,
            id: 8,
            checked: false
        },
        {
            img: watford,
            id: 9,
            checked: false
        },
        {
            img: manchester,
            id: 10,
            checked: false
        },
    ])
    const handleCheck = (id) => {
        setSideMenus((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    return {
                        ...item, checked: !item.checked
                    };
                } else {
                    return {
                        ...item
                    }
                }
            })
        })
    };

    const renderCheckboxs = () => {
        return sideMenus.map(item => (
            <div key={item.id} >
                <div onClick={() => handleCheck(item.id)}>
                    <input
                        type="checkbox"
                        id={item.id}
                    />
                </div>
                <img src={item.img}></img>
            </div>
        ))
    }


    const renderFilter = () => {
        return sideMenus.map((item) => {
            if (item.checked) {
                return (
                    <div key={item.id} onClick={() => handleCheck(item.id)}>
                        <img src={item.img}></img>

                    </div>
                )
            }
        })
    }
    return (
        <div className="App">
            <div className='d-flex flex-row'>{renderCheckboxs()}</div>
            <div className='d-flex flex-row'>{renderFilter()}
                {sideMenus.some(item => item.checked) ? null : <h6>Empty</h6>}
            </div>
        </div>

    )
}
