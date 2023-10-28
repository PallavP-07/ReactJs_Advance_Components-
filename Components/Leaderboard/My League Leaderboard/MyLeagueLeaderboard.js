import React, { useState } from "react";
import Heading from "../../Heading";
import Apidata from "../../../services/LeaderBoardService";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import DropdownSearch from "../../DropdownSearch"

const MyLeagueLeaderboard = ({ loadLeagueCountryData, countryLeagueData, leagueData, optionMyLeagueCountryList, selectedLeagueCountry, selectedLeagueCountryValues, loadCountryData, loadUserLeague, handleLeagueGo, optionleagueName, selectedLeague, selectedLeagueValues }) => {
  const [myLeagueLeaderboard, setMyLeagueLeaderboard] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (leagueData.length !== 0) {
      initData();
    }
  }, [countryLeagueData, leagueData]);

  const initData = async () => {
    let GetMyleague = await Apidata.GetMyleague({ country: countryLeagueData.value, leagueID: leagueData.value });
    setMyLeagueLeaderboard(GetMyleague.data.Results);
  };

  return (
    <div className="">
      <div className="col-md-12 d-md-flex flex-md-row px-3 mt-3">
        <div className="col-md-6">
          <Heading
            className="p-2 leaderboardtitle"
            heading={t("MY_LEAGUE_LEADERBOARD")}
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
            <div className="col-md-8 d-flex flex-row gap-2">
              <div className="col-md-6 leaderboarddropdown">
                <DropdownSearch
                  handleSelect={loadUserLeague}
                  selectedOptions={selectedLeague}
                  placeholder={selectedLeagueValues}
                  optionList={optionleagueName}
                  className="selectboxleader"
                  style={{
                    fontSize: "12px",
                    width: "90%",
                  }}
                />
              </div>
              <div className="col-md-6 leaderboarddropdown">
                <DropdownSearch
                  handleSelect={loadLeagueCountryData}
                  selectedOptions={selectedLeagueCountry}
                  placeholder={selectedLeagueCountryValues}
                  optionList={optionMyLeagueCountryList}
                  className="selectboxleader"
                  style={{
                    fontSize: "12px",
                    width: "90%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 px-3 imageheader ">
        <div className="p-2 ">
          {myLeagueLeaderboard != 0 ?
            <div className="row row-cols-md-6 ">
              {myLeagueLeaderboard.map((item) => (
                <>
                  <div className="col p-1">
                    <div className="card imgcardstyle text-center ">
                      <img className='userimge img-fluid' src={item.userPic}></img>
                      <div className=" col-md-12 d-md-flex flex-md-column justify-content-center">
                        <h5 className="cardusername">{item.userName}</h5>
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
    </div >
  );
};

export default MyLeagueLeaderboard;
