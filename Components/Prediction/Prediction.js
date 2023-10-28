import React, { useState, useEffect } from "react";
import "./Prediction.css";
import Heading from "../Heading";
import PrivacyPolicy from "./PrivacyPolicy";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../ToggleButton";
import Tabnavigation from "../../Components/Tabnavigation";
import Groupstage from "./GroupStages/Groupstage";
import Roundofsixteen from "./Knockout Knowledge/Roundof16/Roundofsixteen";
import Picksix from "./Pick6/Picksix";
import { useTranslation } from "react-i18next";
import DropdownSearch from "../DropdownSearch";
import Apidata from "../../services/FixtureService";
import Apiprectionmenudata from "../../services/PredictionService";
import AdminServices from "../Adminpage/Services/AdminServices";
import { useLocation } from "react-router-dom";
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";

const Prediction = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [Selected, setSelected] = useState(0);
  const [StageSelect, setStageSelect] = useState(0);
  const [selectedKnockOutStage, setSelectedKnockOutStage] = useState([]);
  const [selectedPicksixStage, setSelectedPicksixStage] = useState([]);
  const [tabdata, setTabdata] = useState([]);
  const [matchTypeIndex, setMatchTypeIndex] = useState(0);
  const [groupstages, setGroupStages] = useState();
  const [comptionId, setComptionId] = useState(location?.state?.comptid || "");

  const navigate = useNavigate();

  const tab = [
    {
      name: t("PICK_6"),
      index: 0,
      visible: false,
    },
    {
      name: t("KNOCKOUT_KNOWLEDGE"),
      index: 1,
      visible: false,
    },
  ];

  const [togglebtn, setTogglebtn] = useState(tab);
  const [selectOption, setselectOption] = useState([]);
  const [Matchdayoption, setMatchdayOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [leagueId, setLeagueId] = useState();
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    if (location.state === null) {
      return setTogglebtn((togglebtn[0].visible = true));
    } else {
      setSelected(location.state.inx);
      setMatchTypeIndex(location.state.inx);
      return setTogglebtn(
        (togglebtn[location.state.inx].visible = location.state.visible)
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
    if (matchTypeIndex === 1) {
      loadKnockOutMatchDetails();
    } else {
      loadPickSixMatchDetails();
    }
  }, [matchTypeIndex]);

  const loadKnockOutMatchDetails = async () => {
    let Getfixture = await Apidata.FixturegetUrl();
    let getdata = Getfixture.data.allLeague;
    let formatChange = [];
    let afterSplice = getdata.filter((item) => {
      if (item.competitionFormat === "International cup") {
        return item;
      }
    });
    afterSplice.reverse().map((data, index) => {
      let obj = {
        value: data.tournamentCalendarId,
        label: `${data.leagueName} - (${data.competitionCode})`,
        competitionId: data.competitionId,
        tournamentCalendarId: data.tournamentCalendarId,
        index: index,
        id: data.id,
      };
      formatChange.push(obj);
    });
    setSelectedOptions(formatChange[0].label);
    setselectOption([...formatChange]);
    handleKnockOutSelect(formatChange[0]);
  };
  const handleSelect = (inx) => {
    setMatchTypeIndex(inx.index);
    if (Selected != inx.name) {
      setSelected(inx.index);
    }
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

  const handleKnockOutStageSelection = (data) => {
    let menuDetails = {
      menuStageId: data.stageId,
      menuIndex: data.index,
      menuName: data.name,
      menuStageStartDate: data.stageStartDate.replaceAll('Z', 'T'),
      menuStageEndDate: data.stageEndDate.replaceAll('Z', 'T'),
      menuTournamentCalendarId: data.tournamentCalendarId,
    };
    setSelectedKnockOutStage({ ...menuDetails });
    let inx;
    if (data.name == "Group Stage") {
      inx = 0;
    } else {
      inx = data.index;
    }
    setStageSelect(inx);
    tabdata.map((item) => {
      if (item.index == data.index) {
        item.visible = true;
      } else {
        item.visible = false;
      }
      return item;
    });
    setTabdata([...tabdata]);
  };

  const loadPickSixMatchDetails = async () => {
    let Getpredictionteams = await AdminServices.Getpredictiontable();
    let getdata;
    if (comptionId) {
      getdata = Getpredictionteams.data.allLeague.filter(
        (data) => data.id === comptionId
      );
    } else {
      getdata = Getpredictionteams.data.allLeague.filter(
        (data) => data.competitionFormat === "Domestic league"
      );
    }
    let formatChange = [];
    getdata.map((data) => {
      let county =
        data.countryCode === undefined ? "" : `(${data.countryCode})`;
      let obj = {
        value: data.tournamentCalendarId,
        label: `${data.leagueName} ${county}`,
      };
      formatChange.push(obj);
    });
    setOptionList([...formatChange]);
    setSelectedOptions(formatChange[0].label);
    handlePickSixSelect(formatChange[0]);
  };
  const handlePickSixSelect = async (value) => {
    let LeagueId = value.value;
    setLeagueId(LeagueId);
    let Getres = await AdminServices.ChooseLeague(LeagueId);
    let Response = Getres.data.data;
    let MatchChange = [];
    setSelectedOptions(value?.label);
    if (Response !== undefined) {
      Response.map((datas, index) => {
        let obj = {
          label: datas.matchDays,
          value: datas._id,
          leagueId: datas.premierLeagueID,
          startDate: datas.startDate,
        };
        MatchChange.push(obj);
      });
      setMatchdayOption([...MatchChange]);
    } else {
      setMatchdayOption([...MatchChange]);
    }
  };

  function KnockoutKnowledge() {
    if (StageSelect == 0) {
      return <Groupstage groupstages={groupstages} />;
    } else if (StageSelect >= 1) {
      return (
        <Roundofsixteen
          tabdata={tabdata}
          menuWithIndex={selectedKnockOutStage}
          togglebtn={matchTypeIndex}
        />
      );
    }
  }

  const handleKnockOutSelect = async (event) => {
    let Getmenu = await Apiprectionmenudata.GetStageForTheTournamet({
      competitionId: event.competitionId,
    });
    let getmenudata = Getmenu.data.stage;
    let menuArray = [];
    setSelectedOptions(event?.label);
    let isAllow = false;

    getmenudata.map((menudata, index) => {
      if (menudata.stageName == "Group Stage") {
        isAllow = true;
      }
      if (isAllow) {
        let stageId = menudata.stageId;
        let startDate = menudata.startDate.replaceAll('Z', 'T');
        let endDate = menudata.endDate;
        let stagenames = menudata.stageName;
        let menujson = {
          stageId: stageId,
          stageStartDate: startDate,
          stageEndDate: endDate,
          tournamentCalendarId: event.tournamentCalendarId,
          name: stagenames,
          index: index,
          visible: index === 0 || menudata.stageName === "Group Stage" ? true : false,
        };
        menuArray.push(menujson);
      }
    });
    setTabdata([...menuArray]);
    setGroupStages(menuArray[0]);
  };

  return (
    <div className="px-3" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center">
        {bannerData.length > 0 &&
          bannerData.map((data) => {
            return data.screenName === "Prediction" &&
              data.screenPosition === "Top" ? (
              <img src={data.s3Url} className="img-fluid adBanner" alt="..." />
            ) : null;
          })}
      </div>
      <div className=" col-12 d-md-flex flex-row gap-2 MyToggleButton">
        <div className="col-12 col-md-6 d-flex flex-row justify-content-start px-1 mt-3">
          <ToggleButton togglebtn={togglebtn} handleSelect={handleSelect} />
        </div>

        <div className="col-12 col-md-6 d-flex flex-row justify-content-md-end justify-content-start align-items-center gap-2 mt-2 px-2">
          <Heading
            heading={t("FILTER")}
            style={{
              color: " #344054",
              fontSize: "14px",
              fontWeight: 400,
            }}
          />
          {Selected === 0 ? (
            <div className="pick6dropdown ">
              <DropdownSearch
                handleSelect={handlePickSixSelect}
                selectedOptions={selectedOptions}
                placeholder={selectedOptions}
                optionList={optionList}
              />
            </div>
          ) : (
            <div className="knockdropdown ">
              <DropdownSearch
                handleSelect={handleKnockOutSelect}
                selectedOptions={selectedOptions}
                placeholder={selectedOptions}
                optionList={selectOption}
              />
            </div>
          )}
        </div>
      </div>
      {Selected == 0 ? (
        <div></div>
      ) : (
        <div className=" mt-2 col-md-12 d-md-flex flex-md-row justify-content-start align-items-center tabstyle ">
          <Tabnavigation
            navlink={tabdata}
            handleChangeTitle={handleKnockOutStageSelection}
          />
        </div>
      )}
      {Selected == 0 ? (
        Matchdayoption?.length > 0 ? (
          <Picksix
            id="pick6"
            Matchdayoption={Matchdayoption}
            leagueId={leagueId}
            menuWithIndex={selectedPicksixStage}
          />
        ) :
          <div className="d-flex justify-content-center py-4 ">
            <span className="nodata">No Data Found</span>
          </div>
      ) : (
        <KnockoutKnowledge id="knockout" />
      )}
      <div className="col-12 privacypolicy">
        <PrivacyPolicy />
      </div>
    </div>
  );
};

export default Prediction;
