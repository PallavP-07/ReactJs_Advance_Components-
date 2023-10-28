import React, { useState, useEffect, useRef } from "react";
import Card from "../Card";
import "../../Assets/Styles/Fixture.css";
import Heading from "../Heading";
import ToggleButton from "../ToggleButton";
import { useTranslation } from "react-i18next";
import DropdownSearch from "../DropdownSearch";
import Apidata from "../../services/FixtureService";
import HomeApidata from "../../services/HomeService";
import moment from "moment";
import { Radio } from "antd";
import _ from "lodash";
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";
import Loader from "../Loader";
import { useLocation } from "react-router-dom";
const imgUrl = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/";

export const Fixture = ({ }) => {
  const location = useLocation()
  const [value, setValue] = useState(1);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState([]);
  const [Selected, setSelected] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [teams, setTeams] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const tab = [
    {
      name: t("POPULAR_FOOTBALL_LEAGUES"),
      index: 0,
      visible: false,
    },
    {
      name: t("MY_TEAMS_LEAGUES"),
      index: 1,
      visible: false,
    },
  ];
  const [togglebtn, setTogglebtn] = useState(tab);



  useEffect(() => {
    if (location.state === null) {
      return setTogglebtn((togglebtn[0].visible = true));
    }
    else {
      setSelected(location.state.index);
      return setTogglebtn(
        (togglebtn[location.state.index].visible = location.state.visible)
      );
    }
  }, []);
  
  useEffect(() => {
    setTogglebtn(tab);
    bannerImg();
  }, [i18n.language]);

  const bannerImg = async () => {
    let adbanner = await BannerApidata.GetAdminhometopbannertable();
    let banner = adbanner.data.Results;
    setBannerData(banner);
  };

  useEffect(() => {
    if (Selected == 0) {
      PopularLeagues();
    } else {
      MyteamData();
    }
  }, [Selected]);

  useEffect(() => {
    if (!_.isEmpty(option)) {
      handleChange(option[0]);
      setSelectedOptions(option[0].label);
    }
  }, [option]);

  useEffect(() => {
    resultsAndupcoming();
  }, []);

  useEffect(() => {
    setTeams([...resultsAndupcoming(results)]);
  }, [value])

  const handleSelect = (inx) => {
    if (Selected != inx.index) setSelected(inx.index);
    togglebtn.map((item) => {
      if (item.index == inx.index) {
        item.visible = true;
      } else {
        item.visible = false;
      }
      return item;
    });
    setTogglebtn([...togglebtn]);
  };

  const resultsAndupcoming = (data) => {
    if (value == 1) {
      return data?.filter((item, index) => {
        let dateZ = item.date_time
        return moment().isBefore(moment(dateZ));
      });
    } else {
      let filteredData = data?.filter((item, index) => {
        let dateZ = item.date_time
        return moment().isAfter(moment(dateZ));
      });
      return filteredData.sort(
        (a, b) => new moment(b.date_time) - new moment(a.date_time)
      );
    }
  };

  const PopularLeagues = async () => {
    setIsLoading(true);
    let Getfixture = await Apidata.FixturegetUrl();
    setIsLoading(false);
    let getdata = Getfixture.data.allLeague;
    let formatChange = [];
    getdata.map((data, index) => {
      let county =
        data.countryCode === undefined ? "" : `- (${data.countryCode})`;
      let obj = {
        value: data.tournamentCalendarId,
        label: `${data.leagueName}  ${county}`,
        id: data.competitionId,
        competition: data.competitionFormat,
        countryName: data.country,
      };
      formatChange.push(obj);
    });
    setOption([...formatChange]);
  };

  const MyteamData = async () => {
    setIsLoading(true);
    let Gethome = await HomeApidata.GetActiveMatchForTheUser();
    setIsLoading(false);
    let getdata = Gethome.data.data;
    let formatChange = [];
    getdata.map((data, index) => {
      // let date = `${data.matchDate} ${data.matchTime}`;
      let date = data.matchDate.replaceAll('Z', 'T')
      // let time = data.matchTime.replaceAll('Z', '.000Z')
      let dateZ = `${date}${data.matchTime}`;
      let obj = {
        Group: data.tournamentName,
        Ateam: data.fromTeam,
        Bteam: data.toTeam,
        Ateamimg: `${imgUrl}${data.homeCountryCode}${".png"}`,
        Bteamimg: `${imgUrl}${data.awayCountryCode}${".png"}`,
        Vs: "Vs",
        Navcard: false,
        live: false,
        date_time: dateZ,
        goal: undefined == data.goal.total ? "" : data.goal.total,

      };
      formatChange.push(obj);
    });
    setResults([...formatChange]);
    setTeams([...resultsAndupcoming(formatChange)]);
  };

  const handleChange = async (data) => {
    let tournment = { tournamentCalendarId: data.value };
    let leagues = data.label;
    let competition = data.competition;
    let country = data.countryName;
    setSelectedOptions(data?.label);
    setIsLoading(true);
    let GetMatches = await Apidata.GetMatchesForTheTournament(tournment);

    setIsLoading(false);
    let formatChange = [];
    let getdata = GetMatches.data.matches;
    getdata.map((data, index) => {
      // let date = `${data.matchDate} ${data.matchTime}`;
      // let dateZ = date //.replaceAll('Z', '')
      let date = data.matchDate.replaceAll('Z', 'T')
      // let time = data.matchTime.replaceAll('Z', '.000Z')
      let dateZ = `${date}${data.matchTime}`;
      let obj = {
        Group: leagues,
        Ateam: data.fromTeam,
        Bteam: data.toTeam,
        Ateamimg: country == 'Bahrain' && (data.homeCountryCode || data.awayCountryCode) == 'AHL' ? `${imgUrl}${data.homeCountryCode}_${country}${".png"}` : `${imgUrl}${data.homeCountryCode}${".png"}`,
        Bteamimg: `${imgUrl}${data.awayCountryCode}${".png"}`,
        AteamimgAlt: data.homeCountryCode,
        BteamimgAlt: data.awayCountryCode,
        Vs: "Vs",
        button: true,
        time: data.matchTime,
        date: data.matchDate,
        live: false,
        goal: undefined == data.goal.total ? "" : data.goal.total,
        date_time: dateZ,
        competitionId: data.competitionId,
        macthId: data.macthInfoId,
        seasonId: data.tournamentCalendarId,
        competitionFormat: competition,
        country,
      };
      formatChange.push(obj);
    });
    setResults([...formatChange]);
    setTeams([...resultsAndupcoming(formatChange)]);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className=" col-md-12 Fixture px-3 mb-4">
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center">
        {
          bannerData.length > 0 && bannerData.map((data) => {
            return data.screenName === "Fixture" && data.screenPosition === "Top" ?
              <img src={data.s3Url} className="img-fluid adBanner" alt="..." /> : null
          })
        }
      </div>
      <div className=" col-12 d-flex flex-row  ">
        <Heading
          className="py-2"
          heading={t("FIXTURES_RESULTS")}
          style={{ color: " #344054", fontSize: "16px", fontWeight: "bold" }}
        />
      </div>
      <div className="gap-3 col-md-12 d-md-flex flex-md-row justify-content-center">
        <div className="col-md-10  mb-2">
          <div className=" col-12 d-md-flex flex-row gap-2  ">
            <div className="col-12 col-md-6 d-flex flex-row justify-content-start px-1 ">
              <ToggleButton togglebtn={togglebtn} handleSelect={handleSelect} />
            </div>
            {Selected == 0 ? (
              <div className="col-12 col-md-6 d-flex flex-row justify-content-md-end justify-content-start align-items-center gap-2 mt-2 px-2">
                <Heading
                  heading={t("FILTER")}
                  style={{
                    color: " #344054",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                />
                <div className="fixturesDropdown ">
                  <DropdownSearch
                    handleSelect={handleChange}
                    placeholder={selectedOptions}
                    selectedOptions={selectedOptions}
                    optionList={option}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="d-flex flex-row gap-2 px-1 pt-1">
            <div>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>{t("UPCOMING")}</Radio>
                <Radio value={2}>{t("LIVE_RESULTS")}</Radio>
              </Radio.Group>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {Selected == 0 ? (
                <div className="row row-cols-md-2 mt-2">
                  {teams.length > 0 &&
                    teams.map((datas, idx) => {
                      return (
                        <div key={idx} className="col col-12 ">
                          <Card data={datas} value={value} />
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="row row-cols-md-2 mt-2">
                  {teams.length > 0 &&
                    teams.map((datas, idx) => {
                      return (
                        <div key={idx} className="col col-12 ">
                          <Card data={datas} />
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          )}
        </div>
        <div className="col-md-2 d-md-flex flex-md-row justify-content-end d-none d-md-block">
          <div className="d-flex ms-md-3 justify-content-around align-items-start">
            {bannerData.length > 0 &&
              bannerData.map((data) => {
                return data.screenName === "Fixture" &&
                  data.screenPosition === "Left" ? (
                  <img src={data.s3Url} className="img-fluid" alt="..." />
                ) : null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
