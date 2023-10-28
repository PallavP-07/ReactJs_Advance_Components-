import React from 'react'
import "../../Assets/Styles/Fixturecard.css"
import utils from '../utils'
import { useTranslation } from "react-i18next";

const Fixturecard = ({ style, data }) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="col-12 fixturecard p-2 d-flex flex-row justify-content-center"  dir={i18n.language == "ar" ? "rtl" : "ltr"} >
            <div className=" col-12 mx-2 " style={style}>
                <div className="col-12  card text-center" >
                    <h5 className="card-title" style={{ fontSize: "14px", fontWeight: "bold" }}>{data.Group}</h5>
                    <h5 className="card-text mt-1" style={{ fontSize: "11px" }}>
                        {utils.getLocalTime(data.date)}
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Fixturecard