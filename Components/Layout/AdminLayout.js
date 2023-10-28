import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import Homeimg from "../../Assets/Images/Homeimg.svg";
import Resultimg from "../../Assets/Images/Resultimg.svg";
import Predictionimg from "../../Assets/Images/Predictionimg.svg";
import Prizeimg from "../../Assets/Images/Prizeimg.svg";

const AdminLayout = ({ children }) => {

  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const navList = [
    {
      name: t("FOOTBALL"),
      index: 0,
      visible: true,
    },
    {
      name: t("CRICKET"),
      index: 1,
      visible: false,
    },
    {
      name: t("BASKETBALL"),
      index: 2,
      visible: false,
    },
    {
      name: t("GOLF"),
      index: 3,
      visible: false,
    },
    {
      name: t("TENNIS"),
      index: 4,
      visible: false,
    },
    {
      name: t("HOCKEY"),
      index: 5,
      visible: false,
    },
  ];
  const sideNavList = [
    {
      name: t("HOME"),
      img: Homeimg,
      index: 0,
      visible: false,
      link: "adminhome",
    },
    {
      name: t("PREDICTIONS"),
      img: Predictionimg,
      index: 1,
      visible: false,
      link: "adminprediction",
    },
    {
      name: t("PRIZES"),
      img: Prizeimg,
      index: 2,
      visible: false,
      link: "adminprizes",
    },
    {
      name: t("SPONSORS_CLIENTS"),
      img: Resultimg,
      index: 3,
      visible: false,
      link: "adminsponser",
    },
  ];
  const [sideMenus, setSideMenus] = useState(sideNavList);
  const [navlinks, setNavlinks] = useState(navList);
  useEffect(() => {
    setNavlinks(navList);
    setSideMenus(sideNavList);
    localStorage.setItem(
      "SelectedMenuItem",
      localStorage.getItem("SelectedMenuItem")
        ? localStorage.getItem("SelectedMenuItem")
        : t("HOME")
    );
  }, [i18n.language]);

  useEffect(() => {
    console.log(
      "sidenavelink",
      sideNavList,
      localStorage.getItem("SelectedMenuItem")
    );
    sideNavList.map((data) => {
      if (data.name === localStorage.getItem("SelectedMenuItem")) {
        sidehandleChangeTitle(data);
      }
    });
  }, [localStorage.getItem("SelectedMenuItem")]);
  const handleChangeTitle = (inx) => {
    navlinks.map((item) => {
      if (item.index == inx) {
        item.visible = true;
      } else {
        item.visible = false;
      }
      return item;
    });
    setNavlinks([...navlinks]);
  };

  const sidehandleChangeTitle = (data) => {
    sideMenus.map((item) => {
      if (item.index === data.index) {
        item.visible = true;
        localStorage.setItem("SelectedMenuItem", data.name);
      } else {
        item.visible = false;
      }
      return item;
    });
    setSideMenus([...sideMenus]);
    navigate(`/${data.link}`);
  };
  return (
    <>
      <Navbar navlink={navlinks} handleChangeTitle={handleChangeTitle} />
      <div className="landingpage" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <div className="row ">
          <div className="col-md-2 sidebarstyle">
            <Sidebar
              sideMenus={sideMenus}
              sidehandleChangeTitle={sidehandleChangeTitle}
            />
          </div>
          <div className="col-md-10 ">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
