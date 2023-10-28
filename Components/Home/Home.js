import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "./Leaderboard/Leaderboard";
import Carousels from "../Carousel";
import "../../Assets/Styles/Home.css";
import Quickplay from "./Quickplay/Quickplay";
import Heading from "../Heading";
import Matchroom from "./MatchRoom/Homematchroom";
import Winingpage from "./Who_is_win_page/Winingpage";
import { useTranslation } from "react-i18next";
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";
import ApiGetActiveMatchForTheUser from "../../services/HomeService";
import PopularteamApi from "../../services/FixtureService";
import moment from "moment";
import Loader from "../Loader";
import ApiDataGetLeague from "../../services/LeaderBoardService";

const imgUrl = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [PopTeams, setPopTeams] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [leaderData, setLeaderData] = useState();
  const dataFetchedRef = useRef(false)

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    initData();
    PopulorData();
    bannerImg();
    leaderBoard();

  }, []);

  const bannerImg = async () => {
    let adbanner = await BannerApidata.GetAdminhometopbannertable();
    let banner = adbanner.data.Results;
    setBannerData(banner);
  };

  const initData = async () => {
    setIsLoading(true);
    let Gethome = await ApiGetActiveMatchForTheUser.GetActiveMatchForTheUser();
    setIsLoading(false);
    let getdata = Gethome.data.data;
    let formatChange = [];
    getdata.map((data, index) => {
      // let date = `${data.matchDate} ${data.matchTime}`;
      // let dateZ = date //.replaceAll('Z', '')
      let date = data.matchDate.replaceAll('Z', 'T')
      // let time = data.matchTime.replaceAll('Z', '.000Z')
      let dateZ = `${date}${data.matchTime}`;
      let obj = {
        Group: data.tournamentName,
        Ateam: data.fromTeam,
        Bteam: data.toTeam,
        Ateamimg: `${imgUrl}${data.homeCountryCode}${".png"}`,
        Bteamimg: `${imgUrl}${data.awayCountryCode}${".png"}`,
        AteamimgAlt: data.homeCountryCode,
        BteamimgAlt: data.awayCountryCode,
        Vs: "Vs",
        Navcard: false,
        live: false,
        date_time: dateZ,
      };
      formatChange.push(obj);
    });
    setTeams([...resultsAndupcoming(formatChange)]);
  };

  const leaderBoard = async () => {
    let leadersData = await ApiDataGetLeague.GetElstriker();
    let leaders = leadersData.data.Results;
    setLeaderData(leaders);
  };

  const resultsAndupcoming = (data) => {
    return data?.filter((item, index) => {
      let dateZ = item.date_time
      return moment().isBefore(moment(dateZ).add(3, "hours"));
    });
  };

  const PopulorData = async () => {
    let Popularleague = await PopularteamApi.FixturegetUrl();
    let getdata = Popularleague.data.allLeague;
    let TournamentName = `${getdata[1].name}`;
    let sendingData = {
      tournamentCalendarId: getdata[1].tournamentCalendarId,
    };
    setIsLoading(true);
    let GetMatches = await PopularteamApi.GetMatchesForTheTournament(
      sendingData
    );
    setIsLoading(false);
    let PopMatch = GetMatches.data.matches;
    let formatChange = [];
    PopMatch.map((data, index) => {
      // let date = `${data.matchDate} ${data.matchTime}`;
      // let dateZ = date //.replaceAll('Z', '')
      let date = data.matchDate.replaceAll('Z', 'T')
      // let time = data.matchTime.replaceAll('Z', '.000Z')
      let dateZ = `${date}${data.matchTime}`;
      let obj = {
        Group: TournamentName,
        Ateam: data.fromTeam,
        Bteam: data.toTeam,
        Ateamimg: `${imgUrl}${data.homeCountryCode}${".png"}`,
        Bteamimg: `${imgUrl}${data.awayCountryCode}${".png"}`,
        AteamimgAlt: data.homeCountryCode,
        BteamimgAlt: data.awayCountryCode,
        Vs: "Vs",
        Navcard: false,
        live: false,
        date_time: dateZ,
      };
      formatChange.push(obj);
    });
    setPopTeams([...resultsAndupcoming(formatChange)]);
  };

  const MyTeamonClick = () => {
    localStorage.setItem("SelectedMenuItem", t("FIXTURES_RESULTS"));
    navigate("/fixtures", {
      state: { index: 1, visible: true, name: t("MY_TEAMS_LEAGUES") },
    });
  };
  const PopularonClick = () => {
    localStorage.setItem("SelectedMenuItem", t("FIXTURES_RESULTS"));
    navigate("/fixtures", {
      state: { index: 0, visible: true, name: t("POPULAR_FOOTBALL_LEAGUES") },
    });
  };

  return (
    <div className=" Home px-1 px-md-3 ">
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center">
        {
          bannerData.length > 0 && bannerData.map((data) => {
            return data.screenName === "Home" && data.screenPosition === "Top" ?
              <img src={data.s3Url} className="img-fluid adBanner" alt="..." /> : null
          })
        }

      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {teams.length != 0 &&
              <>
                <div className=" col-md-12 d-flex flex-row px-2">
                  <div className="col-6 d-flex flex-row justify-content-start ">
                    <Heading
                      className=""
                      heading={t("MY_TEAMS_LEAGUES")}
                      style={{
                        color: " #344054",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    />
                  </div>
                  <div className="col-6 d-flex flex-row justify-content-end">
                    <div
                      className="col-6 d-flex flex-row justify-content-end "
                      style={{
                        color: " #344054",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      onClick={MyTeamonClick}
                    >
                      <span className="viewall">{t("VIEW_ALL")}</span>
                    </div>
                  </div>
                </div>
                <Carousels data={teams} responsive={responsive} />
              </>
            }
          </>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {PopTeams.length != 0 &&
              <>
                <div className=" col-md-12 d-flex flex-row px-2">
                  <div className="col-6 d-flex flex-row justify-content-start">
                    <Heading
                      className=""
                      heading={t("POPULAR_MATCHES")}
                      style={{
                        color: " #344054",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    />
                  </div>
                  <div
                    className="col-6 d-flex flex-row justify-content-end"
                    style={{
                      color: " #344054",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                    onClick={PopularonClick}
                  >
                    <span className="viewall">{t("VIEW_ALL")}</span>
                  </div>
                </div>
                <Carousels data={PopTeams.reverse()} responsive={responsive} />
              </>
            }
          </>
        )}
      </div>
      <div className="row row-cols-md-2">
        <div className="col-md-6">
          <Quickplay />
        </div>
        <div className="col-md-6">
          <Matchroom />
        </div>
        <div className="col-md-6">
          <Leaderboard leaderData={leaderData} />
        </div>
        <div className="col-md-6 mt-3 py-4">
          <Winingpage />
        </div>
      </div>
    </div>
  );
};
export default Home;
