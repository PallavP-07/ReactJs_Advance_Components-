import React, { useState, useEffect } from 'react'
import Addicon from "../../../Assets/Images/Addcoloricon.svg"
import Removeicon from "../../../Assets/Images/Removecoloricon.svg"
import Editcoloricon from "../../../Assets/Images/Editcoloricon.svg"
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import "../../../Assets/Styles/ImageIcon.css"
const DelImageRender = () => {
    return (
        <div>
            <img src={Removeicon} />
        </div>
    )
}
const AddImageRender = () => {
    return (
        <div>
            <img src={Addicon} />
        </div>
    )
}
const EditImageRender = () => {
    return (
        <div>
            <img src={Editcoloricon} />
        </div>
    )
}
export function UpArrowImageRender({ data }) {
    console.log("data====>",data);
    return (
        <div>
            {data.eventType == "Substitute" ?
                <>
                    <ArrowUpOutlined className='arrowimageColor' /><span className='mt-2'>{" " + data.oFFPlayer} </span><ArrowDownOutlined className='arrowimageColor' />{" " + data.onPlayer}
                </> :
                <>{data.scorerName}</>
            }

        </div>
    )
}


export default { DelImageRender, AddImageRender, EditImageRender }
