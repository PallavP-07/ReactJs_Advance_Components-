import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../Assets/Styles/Landingpage.css";
import { useTranslation } from "react-i18next";
import Homeimg from "../../Assets/Images/Homeimg.svg";
import Resultimg from "../../Assets/Images/Resultimg.svg";
import Predictionimg from "../../Assets/Images/Predictionimg.svg";
import Prizeimg from "../../Assets/Images/Prizeimg.svg";
import Leaguesimg from "../../Assets/Images/Leaguesimg.svg";
import Leaderimg from "../../Assets/Images/Leaderimg.svg";
import Matchroomimg from "../../Assets/Images/Matchroomimg.svg";
import How from "../../Assets/Images/how.svg";

const UserLayout = ({ children }) => {
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
      link: "home",
    },
    {
      name: t("FIXTURES_RESULTS"),
      img: Resultimg,
      index: 1,
      visible: false,
      link: "fixtures",
    },
    {
      name: t("PREDICTIONS"),
      img: Predictionimg,
      index: 2,
      visible: false,
      link: "prediction",
    },
    {
      name: t("PRIZES"),
      img: Prizeimg,
      index: 3,
      visible: false,
      link: "prizes",
    },
    {
      name: t("MY_LEAGUES"),
      img: Leaguesimg,
      index: 4,
      visible: false,
      link: "leagues",
    },
    {
      name: t("LEADERBORAD"),
      img: Leaderimg,
      index: 5,
      visible: false,
      link: "leaderboard",
    },
    {
      name: t("MATCH_ROOMS"),
      img: Matchroomimg,
      index: 6,
      visible: false,
      link: "matchroom",
    },
    {
      name: t("HOW_TO_PLAY"),
      img: How,
      index: 7,
      visible: false,
      link: "play",
    },
  ];
  const [navlinks, setNavlinks] = useState(navList);
  const [sideMenus, setSideMenus] = useState(sideNavList);

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
        <div className="row commonstyle">
          <div className="col-md-2 sidebarstyle">
            <Sidebar
              sideMenus={sideMenus}
              sidehandleChangeTitle={sidehandleChangeTitle}
            />
          </div>
          <div className="col-md-10 contentbarstyle">{children}</div>
        </div>
      </div>
    </>
  );
};
export default UserLayout;
