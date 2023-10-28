import React, { useState } from 'react'
import "../Assets/Styles/Tabnavigation.css"

const Tabnavigation = ({ navlink, handleChangeTitle, visible }) => {
    return (
        <>
            <div className='col-md-12 px-1'>
                <div className=' col-md-12 d-md-flex flex-row'>
                    {navlink.map((data, index) => {
                        return (
                            <div key={index} className='p-2 sportabcard' onClick={() => handleChangeTitle(data)} >
                                {data.visible ?
                                    <span className='px-2 clickstyle'>
                                        {data.name}
                                    </span> :
                                    <span className='px-2 unclickstyle'>
                                        {data.name}
                                    </span>}
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}


export default Tabnavigation

