import React from "react";
import { useState } from "react";
import Selectbox from "../Selectbox";
import ELStriker from "../../Assets/Images/ElStriker.png";
import "../../Assets/Styles/FirstNavBar.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Link } from "react-scroll";

function FirstNavBar() {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [option, setOption] = useState([{ label: "EN", value: "en" }, { label: "AR", value: "ar" }]);

  const handleChange = (value) => {
    i18n.changeLanguage(value)
    localStorage.setItem("Language", value);
    window.location.reload(true);
  };

  const handleClick = (value) => {
    if (value == "signin") {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="col-12 firsrNavbar" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <nav  id="navbar_top" className="navbar navbar-expand-lg navbar-white">
          <div className="container-fluid">
            <a className="navbar-brand">
              <img src={ELStriker} width={"100%"} alt="ElStriker" />
            </a>
           
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mynavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="home" smooth={true} duration={100}>
                    <a className="nav-link">{t('HOME')}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="prizes1" smooth={true} duration={100}>
                    <a className="nav-link">{t('PRIZES')}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="sponsor1" smooth={true} duration={100}>
                    <a className="nav-link">{t('SPONSORS')}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="clients1" smooth={true} duration={100}>
                    <a className="nav-link">{t('CLIENTS_PARTNERS')}</a>
                  </Link>
                </li>
              </ul>
              <div className="col col-md-3 d-flex justify-content-end logoutstyle gap-4">
                  <div className="col-md-4 d-flex flex-row justify-content-start align-items-center gap-2 ">
                    <a 
                     onClick={() => handleClick("signin")} 
                     >{t('LOGIN')}</a>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <Selectbox
                      option={option}
                      defaultValue={i18n.language}
                      handleChange={handleChange}
                      bordered={false}
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default FirstNavBar;
