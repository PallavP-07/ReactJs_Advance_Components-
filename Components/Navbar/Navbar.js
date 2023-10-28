import React, { useState } from "react";
import Bellimg from "../../Assets/Images/Bellimg.svg";
import "../../Assets/Styles/Navbar.css";
import Selectbox from "../Selectbox";
import ELStriker from "../../Assets/Images/ElStriker.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import settingicon from "../../Assets/Images/settingicon.svg";
import logout from "../../Assets/Images/logout.svg";
import { language, logouts } from "../../Redux/Action";
import { useSelector, useDispatch } from "react-redux";

const Navbar = ({ navlink }) => {
  const login_user = useSelector((state) => state?.userReducer);
  const username = login_user.user.name;
  const userPic = login_user.user.profilePic;
  const userTokken = login_user.token;
  // console.log("login_user", login_user.user.language)
  const languages = login_user.user.language
  const [isBellShown, setIsBellShown] = useState(userTokken);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [options] = useState([
    { label: "EN", value: "en" },
    { label: "AR", value: "ar" },
  ]);
  const { i18n, t } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem("Language", value);
    window.location.reload(true);
    dispatch(language(value));
  };

  const handleClick = (value) => {
    localStorage.clear();
    localStorage.setItem("SelectedMenuItem", t("HOME"));
    dispatch(logouts(true));
    if (value === "logout") {
      navigate("/");
    }
  };
  const GotoHomepage = () => {
    if (login_user.user.email === "admin@gmail.com") {
      localStorage.setItem("SelectedMenuItem", t("HOME"));
      navigate("/adminhome");
    } else {
      localStorage.setItem("SelectedMenuItem", t("HOME"));
      navigate("/home");
    }
  };
  return (
    <>
      <div
        className="firstNavbar navbarInside p-0 px-1"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <nav className="navbar navbar-expand-xl ">
          <div className="container-fluid">
            <a className="navbar-brand" onClick={GotoHomepage}>
              <div className="col col-md-12 ">
                <img src={ELStriker} width={"90%"} alt="ElStriker" />
              </div>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mynavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className=" collapse navbar-collapse" id="mynavbar">
              <ul className="navbar-nav me-auto">
                {navlink.map((data, index) => {
                  return (
                    <li key={index} className="nav-item">
                      {data.visible ? (
                        <span className=" onclickfield ">{data.name}</span>
                      ) : (
                        <span className=" unclickfield d-none">
                          {data.name}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="col col-md-3">
                <div className="col-12  d-flex justify-content-center gap-1">
                  {isBellShown === null ? '' :
                    <>
                      <div className="col-2 d-flex flex-row justify-content-end align-items-center">
                        <img src={Bellimg}
                          style={{ width: 20, height: 20 }}
                          alt="" />
                      </div>
                      <div className="col-7  d-flex flex-row justify-content-center gap-1 loginDropdown">
                        <li className="nav-item dropdown ">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <div className="d-flex d-flex flex-row justify-content-start align-items-center pt-1 gap-1">
                              <img
                                src={userPic}
                                style={{ width: 40, height: 40, borderRadius: 40 }}
                                className="img-fluid"
                                alt=""
                              />
                              <div className="usernamestyle">{username}</div>
                            </div>
                          </a>
                          <ul
                            className="dropdown-menu dropdownhole"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <div className="d-flex d-flex flex-row px-2 align-items-center pt-1 gap-1 userprofiledrop">
                                <img
                                  src={userPic}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 20,
                                  }}
                                  className="img-fluid"
                                  alt=""
                                />
                                <div className="usernamestyle1">{username}</div>
                              </div>
                            </li>
                            <hr className="dropdownhorizontal" />
                            <div className="alldropdown">
                              {
                                login_user.user.usertype === "admin" ? <></> :
                                  <li>
                                    <a
                                      className="d-flex gap-2 dropdown-item droptext"
                                      onClick={() => navigate("/account")}
                                    >
                                      <img src={settingicon} />
                                      <div>{t("ACCOUNT_SETTINGS")}</div>
                                    </a>
                                  </li>
                              }
                              <li>
                                <a
                                  className="d-flex gap-2 dropdown-item droptext"
                                  onClick={() => handleClick("logout")}
                                >
                                  <img src={logout} />
                                  <div>{t("LOGOUT")}</div>
                                </a>
                              </li>
                            </div>
                          </ul>
                        </li>
                      </div>
                    </>
                  }
                  {
                    login_user.user.usertype === "admin" ? <></> :
                      <div className="col-3 d-flex flex-row justify-content-start align-items-center  ">
                        <Selectbox
                          option={options}
                          defaultValue={i18n.language}
                          handleChange={handleChange}
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
