import React, { useState } from "react";
import "../../Assets/Styles/Prizes.css";
import { useTranslation } from "react-i18next";
import { colors } from "../Color";
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";
import { useEffect } from "react";

const HowtoPlay = () => {
  const { t, i18n } = useTranslation();
  const color = colors;
  const [bannerData, setBannerData] = useState([]);

  const bannerImg = async () => {
    let adbanner = await BannerApidata.GetAdminhometopbannertable();
    let banner = adbanner.data.Results;
    setBannerData(banner);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      bannerImg();
    }, 2000);
  }, []);

  return (
    <div className="Prizesbox p-3">
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center">
        {bannerData.length > 0 &&
          bannerData.map((data) => {
            return data.screenName === "HowtoPlay" &&
              data.screenPosition === "Top" ? (
              <img src={data.s3Url} className="img-fluid adBanner" alt="..." />
            ) : null;
          })}
      </div>
      <div className="">
        <h3 className="brandColor">{t("HOW_TO_PLAY")}</h3>
        <p>{t("HOW_TO_PLAY_DESCRIPTION")}</p>
        <h3>{t("HOW_TO_PLAY_SUMMARY")}</h3>
        <p>{t("HOW_TO_PLAY_SUMMARY_DESCRIPTION")}</p>
        <h3>{t("MAKING_PREDICTIONS")}</h3>
        <p>
          {t("MAKING_PREDICTIONS_DESCRIPTION1")}
          <ol type="i">
            <li>{t("PREDICT_THE_SCORE")}</li>
            <li>{t("MATCH_OUTCOME_PREDICT_HOME_WIN_DRAW_AWAY_WIN")}</li>
            <li>{t("TOTAL_GOALS")}</li>
            <li>{t("FIRST_TEAM_TO_SCORE")}</li>
            <li>{t("FIRST_PLAYER_TO_SCORE")}</li>
          </ol>
          <p>{t("MAKING_PREDICTIONS_DESCRIPTION2")}</p>
        </p>
        <h3>{t("EARNING_POINTS")}</h3>
        <p>{t("EARNING_POINTS_DESCRIPTION")}</p>
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
              <p>
                {t("SERVICE_PROVIDERS_AND_THIRD_PARTIES_DESCRIPTION1")}
                <br /> {t("SERVICE_PROVIDERS_AND_THIRD_PARTIES_DESCRIPTION2")}
              </p>
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
              <p>{t("CHATS_ROOMS_FORUMS_AND_MESSAGE_BOARDS_DESCRIPTION")}</p>
              <b>
                <li>
                  {t("SHORT_MESSAGE_SERVICE")}
                  <br />
                </li>
              </b>
              <p>
                {t("SHORT_MESSAGE_SERVICE_DESCRIPTION1")}
                <br />
                {t("SHORT_MESSAGE_SERVICE_DESCRIPTION2")}
              </p>
            </ol>
          </li>
          <b>
            <li>{t("THIRD_PARTY_ADVERTISING")}</li>
          </b>
          <p>{t("THIRD_PARTY_ADVERTISING_DESCRIPTION")}</p>
          <b>
            <li>{t("ALL_USERS_YOUR_CHOICES_AND_CONTROLS")}</li>
          </b>
          <p>{t("ALL_USERS_YOUR_CHOICES_AND_CONTROLS_DESCRIPTION")}</p>
          <b>
            <li>{t("SECURITY_PRACTICES")}</li>
          </b>
          <p>{t("SECURITY_PRACTICES_DESCRIPTION")}</p>
          <b>
            <li>{t("ADDITIONAL_INFORMATION")}</li>
          </b>
          <p>{t("ADDITIONAL_INFORMATION_DESCRIPTION")}</p>
          <b>
            <li>{t("CHANGES_TO_THIS_PRIVACY_POLICY")}</li>
          </b>
          <p>{t("CHANGES_TO_THIS_PRIVACY_POLICY_DESCRIPTION")}</p>
          <b>
            <li>{t("CHILDRENS_DATA")}</li>
          </b>
          <p>{t("CHILDRENS_DATA_DESCRIPTION")}</p>
          <b>
            <li>{t("EXCLUSIONS")}</li>
          </b>
          <p>{t("EXCLUSIONS_DESCRIPTION")}</p>
          <b>
            <li>{t("CONTACT_US")}</li>
          </b>
          <p>{t("CONTACT_US_DESCRIPTION")}</p>
        </ol>
      </div>

      <h3>{t("HOW_TO_PLAY_SUMMARY")}</h3>
      <p>{t("HOW_TO_PLAY_SUMMARY_DESCRIPTION")}</p>
      <h3>{t("MAKING_PREDICTIONS")}</h3>
      <p>
        {t("MAKING_PREDICTIONS_DESCRIPTION1")}
        <ol type="i">
          <li>{t("PREDICT_THE_SCORE")}</li>
          <li>{t("MATCH_OUTCOME_PREDICT_HOME_WIN_DRAW_AWAY_WIN")}</li>
          <li>{t("TOTAL_GOALS")}</li>
          <li>{t("FIRST_TEAM_TO_SCORE")}</li>
          <li>{t("FIRST_PLAYER_TO_SCORE")}</li>
        </ol>
        <p>{t("MAKING_PREDICTIONS_DESCRIPTION2")}</p>
      </p>
      <h3>{t("EARNING_POINTS")}</h3>
      <p>{t("EARNING_POINTS_DESCRIPTION")}</p>
    </div>
  );
};

export default HowtoPlay;
