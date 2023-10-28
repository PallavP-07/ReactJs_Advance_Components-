import React, { useState } from "react";
import Heading from "../../Heading";
import DropdownSearch from "../../DropdownSearch"
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import "../../../Assets/Styles/Leaderboard.css"

const Elstrikerleaderboard = ({ leaderboard, selectedSportsValues, selectedCountryValues, loadSportsData, loadCountryData, optionCountryList, optionSportList, selectedCountry }) => {

  const { t, i18n } = useTranslation();
  let def = {
    "value": null,
    "label": "All"
  }
  return (
    <>
      <div className="col-md-12 d-md-flex flex-md-row justify-content-start align-items-center">
        <div className="col-md-6">
          <Heading
            className="p-2 leaderboardtitle"
            heading={t("ELSTRIKER_LEADERBOARD")}
            style={{ color: " #344054", fontSize: "16px", fontWeight: "bold" }}
          />
        </div>
        <div className="col-md-5">
          <div className="col-md-12 d-md-flex px-3 px-md-0 flex-md-row align-items-center my-2 gap-2">
            <div className=" col-md-4 d-flex flex-row justify-content-start justify-content-md-end ">
              <Heading
                heading={t("FILTER")}
                style={{
                  color: " #344054",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div className="col-md-8 d-flex flex-row gap-2 ">
              <div className="col-md-6 leaderboarddropdown">
                <DropdownSearch
                  defaultValue={def}
                  handleSelect={loadSportsData}
                  placeholder={selectedSportsValues}
                  optionList={optionSportList}
                  className="selectboxleader"
                  style={{
                    fontSize: "12px",
                    width: "90%",
                  }}
                />
              </div>
              <div className="col-md-6 leaderboarddropdown">
                <DropdownSearch
                  defaultValue={def}
                  handleSelect={loadCountryData}
                  selectedOptions={selectedCountry}
                  placeholder={selectedCountryValues}
                  optionList={optionCountryList}
                  className="selectboxleader"
                  style={{ fontSize: "12px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-md-12 px-3 imageheader imageHeaderBody">
        <div className="p-2 ">
          {leaderboard != 0 ?
            <div className="row row-cols-md-6 ">
              {leaderboard.map((item) => (
                <>
                  <div className="col p-2">
                    <div className="card imgcardstyle text-center">
                      <img src={item.userPic} class="img-fluid userimge"></img>
                      <div className=" col-md-12 d-md-flex flex-md-column justify-content-center">
                        <Tooltip placement="top" title={item.userName}>
                          <h5 className="cardusername ">{item.userName}</h5>
                        </Tooltip>
                        <h5 className="carduserpoint">Points - {item.points}</h5>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div> :
            <div className="d-flex justify-content-center py-4 ">
              <span className="nodata">No user in this country</span>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Elstrikerleaderboard;
