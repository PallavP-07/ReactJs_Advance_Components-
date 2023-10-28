import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";
import Heading from "../Heading";
import "../../Assets/Styles/Rules.css";

const TermsnCondition = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navList = [
    {
      name: t("FOOTBALL"),
      index: 0,
      visible: true,
      // link: "home"
    },
    {
      name: t("CRICKET"),
      index: 1,
      visible: false,
      // link: "leaderboard"
    },
    {
      name: t("BASKETBALL"),
      index: 2,
      visible: false,
      // link: "leaderboard"
    },
    {
      name: t("GOLF"),
      index: 3,
      visible: false,
      // link: "leaderboard"
    },
    {
      name: t("TENNIS"),
      index: 4,
      visible: false,
      // link: "leaderboard"
    },
    {
      name: t("HOCKEY"),
      index: 5,
      visible: false,
      // link: "leaderboard"
    },
  ];
  const [navlinks, setNavlinks] = useState(navList);

  useEffect(() => {
    setNavlinks(navList);
  }, [i18n.language]);

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
  return (
    <div>
      <Navbar navlink={navlinks} handleChangeTitle={handleChangeTitle} />
      <div className="rules" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <div className="col-12">
          <Heading
            className="p-2"
            heading={t("TC_H")}
            style={{ color: "#F48220", fontSize: "25px", fontWeight: "bold" }}
          />
        </div>
        <div className="subheading1">
          <span>{t("TC_P")}</span>
        </div>
        <div className="subheading">
          <span>
            <b>1. {t("OWNERSHIP_H")}</b>
            <br />
            {t("OWNERSHIP_P")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>2. {t("ACCESS_H")} </b>
            <br />
            {t("ACCESS_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>
              3. {t("REGISTRATION_H")}
              <br />
              3.1.{t("REG_Privacy_H")}{" "}
            </b>
            <br />
            {t("REG_Privacy_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>3.2 {t("REG_USERNAME_H")} </b>
            <br />
            {t("REG_USERNAME_P")}
          </span>
        </div>
        <div className="subheading">
          <div>
            <span>
              <b>3.3 {t("REG_SUBSCRIPTION_H")} </b>
              <br />
              {t("REG_SUBSCRIPTION_P")}
            </span>
          </div>
        </div>
        <div className="subheading">
          <span>
            <b>4. {t("REG_SERVICE_H")} </b>
            <br />
            {t("REG_SERVICE_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>4.1 {t("REG_SERVICE_MSG_H")} </b>
            <br />
            a. {t("REG_SERVICE_MSG_P1")}
            <br />
            b. {t("REG_SERVICE_MSG_P2")}
            <br />
            c. {t("REG_SERVICE_MSG_P3")}
            <br />
            d. {t("REG_SERVICE_MSG_P4")}
            <br />
            e. {t("REG_SERVICE_MSG_P5")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>4.2 {t("REG_SERVICE_SUB_H")} </b>
            <br />
            {t("REG_SERVICE_SUB_P")}
            <br />
            {t("REG_SERVICE_SUB_P1")}
            <br />
            {t("REG_SERVICE_SUB_P2")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>4.3 {t("REG_SERVICE_OWN_H")} </b>
            <br />
            {t("REG_SERVICE_OWN_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>5. {t("CODE_CONDUCT_H")} </b>
            <br />
            <b>5.1 {t("CODE_CONDUCT_H")} </b>
            <br />
            {t("CODE_CONDUCT_P")}
            <br />
            1. {t("CODE_CONDUCT_P1")}
            <br />
            2. {t("CODE_CONDUCT_P2")}
            <br />
            3. {t("CODE_CONDUCT_P3")}
            <br />
            4. {t("CODE_CONDUCT_P4")}
            <br />
            5. {t("CODE_CONDUCT_P5")}
            <br />
            6. {t("CODE_CONDUCT_P6")}
            <br />
            7. {t("CODE_CONDUCT_P7")}
            <br />
            8. {t("CODE_CONDUCT_P8")}
            <br />
            9. {t("CODE_CONDUCT_P9")}
            <br />
            10. {t("CODE_CONDUCT_P10")}
            <br />
            {t("CODE_CONDUCT_P11")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>5.2 {t("CODE_CONDUCT_GENERAL_H")}</b>
            <br />
            {t("CODE_CONDUCT_GENERAL_P")}
            <br />
            1. {t("CODE_CONDUCT_GENERAL_P1")}
            <br />
            2. {t("CODE_CONDUCT_GENERAL_P2")}
            <br />
            3. {t("CODE_CONDUCT_GENERAL_P3")}
            <br />
            4. {t("CODE_CONDUCT_GENERAL_P4")}
            <br />
            5. {t("CODE_CONDUCT_GENERAL_P5")}
            <br />
            6. {t("CODE_CONDUCT_GENERAL_P6")}
            <br />
            7. {t("CODE_CONDUCT_GENERAL_P7")}
            <br />
            8. {t("CODE_CONDUCT_GENERAL_P8")}
            <br />
            9. {t("CODE_CONDUCT_GENERAL_P9")}
            <br />
            10. {t("CODE_CONDUCT_GENERAL_P10")}
            <br />
            11. {t("CODE_CONDUCT_GENERAL_P11")}
            <br />
            12. {t("CODE_CONDUCT_GENERAL_P12")}
            <br />
            {t("CODE_CONDUCT_GENERAL_P13")}
            <br />
            {t("CODE_CONDUCT_GENERAL_P14")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>6. {t("VOTING_M_PRO_H")} </b>
            <br />
            6.1 {t("VOTING_M_PRO_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>7. {t("LINKS_EMB_H")} </b>
            <br />
            7.1 {t("LINKS_EMB_P")}
            <br />
            {t("LINKS_EMB_P1")}
            <br />
            {t("LINKS_EMB_P2")}
            <br />
            {t("LINKS_EMB_P3")}
            <br />
            {t("LINKS_EMB_P4")}
            <br />
            {t("LINKS_EMB_P5")}
            <br />
            {t("SPONSOR_DESCRIPTION")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>8. {t("AVAIL_SERVICE_H")} </b>
            <br />
            {t("AVAIL_SERVICE_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>9. {t("DISCLAIMER_WARRANTI_H")} </b>
            <br />
            {t("DISCLAIMER_WARRANTI_P1")}
            <br />
            {t("DISCLAIMER_WARRANTI_P2")}
            <br />
            {t("DISCLAIMER_WARRANTI_P3")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>10. {t("NOTICE_H")} </b>
            <br />
            {t("NOTICE_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>11. {t("INDEMNIFICATION_H")} </b>
            <br />
            {t("INDEMNIFICATION_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>12. {t("ACCESS_MOB_DEVICE_H")} </b>
            <br />
            {t("ACCESS_MOB_DEVICE_P")}
            <br />
            {t("ACCESS_MOB_DEVICE_P1")}
            <br />
            {t("ACCESS_MOB_DEVICE_P2")}
            <br />
            {t("ACCESS_MOB_DEVICE_P3")}
            <br />
            {t("ACCESS_MOB_DEVICE_P4")}
            <br />
            {t("ACCESS_MOB_DEVICE_P5")}
            <br />
            {t("ACCESS_MOB_DEVICE_P6")}
            <br />
            {t("ACCESS_MOB_DEVICE_P7")}
            <br />
            {t("ACCESS_MOB_DEVICE_P8")}
            <br />
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>13. {t("TERMINATION_SERVICE_H")} </b>
            <br />
            {t("TERMINATION_SERVICE_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>14. {t("MISCELLANEOUS_H")} </b>
            <br />
            {t("MISCELLANEOUS_P")}
          </span>
        </div>
        <div className="subheading">
          <span>
            <b>15. {t("GOVERNING_LAW_H")} </b>
            <br />
            {t("GOVERNING_LAW_P")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TermsnCondition;
