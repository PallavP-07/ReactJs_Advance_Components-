import React, { useState, useEffect } from "react";
import "../../Assets/Styles/Prizes.css";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";
import Heading from "../Heading";

const Priavcypolicy = () => {
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
      <div
        className="Prizesbox p-3"
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <div className=" ">
          <div className="col-12">
            <Heading
              className="p-1"
              heading={t("PRIVACY_POLICY")}
              style={{ color: "#F48220", fontSize: "25px", fontWeight: "bold" }}
            />
          </div>
          <p>{t("PRIVACY_POLICY_DESCRIPTION1")}</p>
          <a>{t("PRIVACY_POLICY_DESCRIPTION2")}</a>
          <div className="mt-2">
            <ol type="1">
              <li>{t("TYPES_OF_INFORMATION_WE_COLLECT")}</li>
              <li>{t("HOW_WE_COLLECT_YOUR_INFORMATION")}</li>
              <li>{t("HOW_WE_USE_YOUR_INFORMATION")}</li>
              <li>{t("HOW_WE_MAY_SHARE_YOUR_INFROMATION")}</li>
              <li>{t("COMMUNICATION_SERVICES_AND_COMMUNITY_FEATURES")}</li>
              <li>{t("THIRD_PARTY_ADVERTISING")}</li>
              <li>{t("ALL_USERS_YOUR_CHOICES_AND_CONTROLS")}</li>
              <li>{t("SECURITY_PRACTICES")}</li>
              <li>{t("ADDITIONAL_INFORMATION")}</li>
              <li>{t("CHANGES_TO_THIS_PRIVACY_POLICY")}</li>
              <li>{t("CHILDRENS_DATA")}</li>
              <li>{t("EXCLUSIONS")}</li>
              <li>{t("CONTACT_US")}</li>
            </ol>
          </div>
          <div className="mt-2">
            <ol type="1">
              <li className="font-weight-bold ">
                <b>{t("TYPES_OF_INFORMATION_WE_COLLECT")}</b>
                <br />
                <p>{t("TYPES_OF_INFORMATION_WE_COLLECT_DESCRIPTION")}</p>
                <ol type="1">
                  <b>
                    <li>{t("PERSONAL_INFORMATION")}</li>
                  </b>
                  <br />
                  <p>{t("PERSONAL_INFORMATION_DESCRIPTION1")}</p>
                  <ol>
                    <li>{t("PERSONAL_INFORMATION_DESCRIPTION2")}</li>
                    <li>{t("PERSONAL_INFORMATION_DESCRIPTION3")}</li>
                    <li>{t("PERSONAL_INFORMATION_DESCRIPTION4")}</li>
                    <li>{t("PERSONAL_INFORMATION_DESCRIPTION5")}</li>
                  </ol>
                  <b>
                    <li>{t("DEVICE_IDENTIFIABLE_INFORMATION")}</li>
                  </b>
                  <br />
                  <p>{t("DEVICE_IDENTIFIABLE_INFORMATION_DESCRIPTION1")}</p>
                  <p>{t("DEVICE_IDENTIFIABLE_INFORMATION_DESCRIPTION2")}</p>
                  <p>{t("DEVICE_IDENTIFIABLE_INFORMATION_DESCRIPTION3")}</p>
                </ol>
              </li>
              <li>
                <b>{t("HOW_WE_COLLECT_YOUR_INFORMATION")}</b>
                <ol type="A">
                  <b>
                    <li>
                      {t("COOKIES_AND_WEB_BEACONS")}
                      <br />
                    </li>
                  </b>
                  <p>{t("COOKIES_AND_WEB_BEACONS_DESCRIPTION1")}</p>
                  <p>{t("COOKIES_AND_WEB_BEACONS_DESCRIPTION2")}</p>
                  <p>{t("COOKIES_AND_WEB_BEACONS_DESCRIPTION3")}</p>
                  <p>{t("COOKIES_AND_WEB_BEACONS_DESCRIPTION4")}</p>

                  <b>
                    <li>
                      {t("OTHER_DIRECT_INTERACTIONS_WITH_YOU")}
                      <br />
                    </li>
                  </b>
                  <p>{t("OTHER_DIRECT_INTERACTIONS_WITH_YOU_DESCRIPTIONS1")}</p>
                  <p>{t("OTHER_DIRECT_INTERACTIONS_WITH_YOU_DESCRIPTIONS2")}</p>

                  <b>
                    <li>
                      {t("SOCIAL_MEDIA")}
                      <br />
                    </li>
                  </b>
                  <p>{t("SOCIAL_MEDIA_DESCRIPTION")}</p>

                  <b>
                    <li>{t("OTHER_THIRD_PARTY_SOURCES")}</li>
                  </b>
                  <p>{t("OTHER_THIRD_PARTY_SOURCES_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("HOW_WE_USE_YOUR_INFORMATION")}</b>
                <br />
                {t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION1")}
                <p>
                  {t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION2")}
                  <ul>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION3")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION4")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION5")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION6")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION7")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION8")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION9")}</li>
                  </ul>
                </p>
                <p>
                  {t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION10")}
                  <ul>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION11")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION12")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION13")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION14")}</li>
                    <li>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION15")}</li>
                  </ul>
                </p>
                <p>{t("HOW_WE_USE_YOUR_INFROMATION_DESCRIPTION16")}</p>
              </li>

              <li>
                <b>{t("HOW_WE_MAY_SHARE_YOUR_INFROMATION")}</b>
                <br />
                <ol type="A">
                  <b>
                    <li>
                      {t("BUSINESS_TRANSFERS")}
                      <br />
                    </li>
                  </b>
                  <p>{t("BUSINESS_TRANSFERS_DESCRIPTION")}</p>
                  <b>
                    <li>
                      {t("SERVICE_PROVIDERS_AND_THIRD_PARTIES")}
                      <br />
                    </li>
                  </b>
                  <p>{t("SERVICE_PROVIDERS_AND_THIRD_PARTIES_DESCRIPTION1")}</p>
                  <p>{t("SERVICE_PROVIDERS_AND_THIRD_PARTIES_DESCRIPTION2")}</p>
                  <b>
                    <li>
                      {t("USER_REFERRALS")}
                      <br />
                    </li>
                  </b>
                  <p>{t("USER_DESCRIPTION")}</p>
                  <b>
                    <li>
                      {t("THIRD_PARTY_MARKETERS")}
                      <br />
                    </li>
                  </b>
                  <p>{t("THIRD_PARTY_MARKETERS_DESCRIPTION")}</p>
                  <b>
                    <li>
                      {t("LEGAL_REQUIREMENTS")}
                      <br />
                    </li>
                  </b>
                  <p>
                    {t("LEGAL_REQUIREMENTS_DESCRIPTION1")}
                    <ul>
                      <li>{t("LEGAL_REQUIREMENTS_DESCRIPTION2")}</li>
                      <li>{t("LEGAL_REQUIREMENTS_DESCRIPTION3")}</li>
                      <li>{t("LEGAL_REQUIREMENTS_DESCRIPTION4")}</li>
                      <li>{t("LEGAL_REQUIREMENTS_DESCRIPTION5")}</li>
                    </ul>
                  </p>
                </ol>
              </li>
              <li>
                <b>{t("COMMUNICATION_SERVICES_AND_COMMUNITY_FEATURES")}</b>
                <br />
                <ol type="A">
                  <b>
                    <li>
                      {t("CHATS_ROOMS_FORUMS_AND_MESSAGE_BOARDS")}
                      <br />
                    </li>
                  </b>
                  <p>
                    {t("CHATS_ROOMS_FORUMS_AND_MESSAGE_BOARDS_DESCRIPTION")}
                  </p>
                  <b>
                    <li>
                      {t("SHORT_MESSAGE_SERVICE")}
                      <br />
                    </li>
                  </b>
                  <p>{t("SHORT_MESSAGE_SERVICE_DESCRIPTION1")}</p>
                  <p>{t("SHORT_MESSAGE_SERVICE_DESCRIPTION2")}</p>
                </ol>
              </li>
              <li>
                <b>{t("THIRD_PARTY_ADVERTISING")}</b>
                <br />
                <ol type="A">
                  <p>{t("THIRD_PARTY_ADVERTISING_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("ALL_USERS_YOUR_CHOICES_AND_CONTROLS")}</b>
                <br />
                <ol type="A">
                  <p>{t("ALL_USERS_YOUR_CHOICES_AND_CONTROLS_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("SECURITY_PRACTICES")}</b>
                <br />
                <ol type="A">
                  <p>{t("SECURITY_PRACTICES_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("ADDITIONAL_INFORMATION")}</b>
                <br />
                <ol type="A">
                  <p>{t("ADDITIONAL_INFORMATION_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("CHANGES_TO_THIS_PRIVACY_POLICY")}</b>
                <br />
                <ol type="A">
                  <p>{t("CHANGES_TO_THIS_PRIVACY_POLICY_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("CHILDRENS_DATA")}</b>
                <br />
                <ol type="A">
                  <p>{t("CHILDRENS_DATA_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("EXCLUSIONS")} </b>
                <br />
                <ol type="A">
                  <p>{t("EXCLUSIONS_DESCRIPTION")}</p>
                </ol>
              </li>
              <li>
                <b>{t("CONTACT_US")}</b>
                <br />
                <ol type="A">
                  <p>{t("CONTACT_US_DESCRIPTION")}</p>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Priavcypolicy;
