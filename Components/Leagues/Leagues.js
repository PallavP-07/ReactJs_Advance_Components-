import React, { useEffect, useState } from "react";
import TopPointLeague from "./LeaguePerformance/TopPointLeague";
import SizeofMyLeague from "../Leagues/LeaguePerformance/SizeofmyLeague";
import TotalPointsLeague from "../Leagues/LeaguePerformance/TotalPointsgraph";
import LeagueButton from "./LeaguePerformance/Leaguebtn";
import Heading from "../Heading";
import { useTranslation } from "react-i18next";
import ContentHeading from "./ContentHeading/ContentHeading";
import ApiDataGetUserLeagueData from "../../services/LeaderBoardService";
import Apidata from "../../services/LeaderBoardService";
import { useSelector } from "react-redux";
import MyLeagueImage from "../../Assets/Images/myLeagueImage.png";
import { Tooltip } from "antd";
import LeagueButtons from "./ContentHeading/LeagueButtons";
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";
import DeleteLeagueApi from "../../services/LeagueService";
import Loader from "../Loader";
import { toast } from "react-toastify";

const Leagues = () => {
  const UserData = useSelector(state => state.userReducer.user._id);
  const [optionleagueName, setOptionLeagueName] = useState([])
  const [leagueIDvar, setLaegueIDvar] = useState("")
  const [leagueDataTablem, setLeagueDataTable] = useState([])
  const [leagueSizeId, setLeagueSizeId] = useState([])
  const [selectedLeague, setSelectedLeague] = useState([]);
  const [selectedLeagueValues, setSelectedLeagueValues] = useState([]);
  const [leagueData, setLeagueData] = useState([]);
  const { t, i18n } = useTranslation();
  const [bannerData, setBannerData] = useState([])
  const [value, setValue] = useState(1);
  const [leaguetype, setLeagueType] = useState([]);
  const [selectedLeagueOption, setSelectedLeagueOption] = useState([])
  const [leagueDetails, setLeagueDetails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [leagueAdminData, setLeagueAdminData] = useState(false);
  useEffect(() => {
    bannerImg();
    handleUserLeague();
  }, []);
  const bannerImg = async () => {
    let adbanner = await BannerApidata.GetAdminhometopbannertable();
    let banner = adbanner.data.Results
    setBannerData(banner);
  }

  useEffect(() => {
    if (leagueDetails.length !== 0) {
      initData("All");
    }
  }, [leagueDetails, leagueIDvar]);

  const initData = async (sendingKey) => {
    let sendingData = {
      country: null,
      leagueID: leagueIDvar == "" ? leagueDetails[0].value : leagueIDvar,
      duration: sendingKey
    }
    let GetMyleague = await Apidata.GetMyleague(sendingData);
    let LeagueTableData = GetMyleague.data.Results
    let leagueDataArr = []
    console.log("UserData", UserData, LeagueTableData)
    LeagueTableData.map((data, index) => {
      let obj = {
        key: index + 1,
        No: index + 1,
        userName: data.userId == UserData ? "You" : data.userName.charAt(0).toUpperCase() + data.userName.slice(1),
        points: data.points,
        userId: data.userId
      };
      leagueDataArr.push(obj);
    });
    setLeagueDataTable([...leagueDataArr]);
  };

  const onhandleDateFilter = (e) => {
    let sendingKey
    let values = e.target.value
    if (values == 1) {
      sendingKey = "All"
    } else if (values == 2) {
      sendingKey = 7
    } else if (values == 3) {
      sendingKey = 30
    } else {
      sendingKey = 365
    }
    setValue(values);
    initData(sendingKey);
  };

  const handleUserLeague = async () => {
    setIsLoading(true)
    let GetUserLeagues = await ApiDataGetUserLeagueData.GetUserLeagues({ userId: UserData })
    setIsLoading(false)
    let userLeagueResult = GetUserLeagues?.data?.Results
    let leagueTypeArr = []
    let leagueNameArr = []
    userLeagueResult.map((leagueDetails) => {
      let MyleagueData = leagueDetails?.leagueData[0]
      if (MyleagueData !== undefined) {
        let leagueName = MyleagueData?.leagueName
        let leagueIdData = MyleagueData?.leagueId
        let leagueType = MyleagueData?.leagueType
        let leagueLogo = MyleagueData?.leagueLogo
        let leagueAdmin = MyleagueData?.leagueAdmin
        let obj1 = {}
        obj1["value"] = leagueIdData
        obj1["type"] = leagueType
        obj1["label"] = leagueName
        obj1["leagueAdmin"] = leagueAdmin
        leagueTypeArr.push(obj1)
        leagueNameArr.push(obj1)
      }
    })
    setLeagueType([...leagueTypeArr])
    setOptionLeagueName([...leagueNameArr])
    setLeagueSizeId(userLeagueResult)
  }
  console.log("leaguetype", leaguetype);

  const loadUserLeague = (value) => {
    console.log("value",value);
    setLeagueData(value)
    setSelectedLeague(value)
    setLaegueIDvar(value?.value)
    setSelectedLeagueValues(value?.label)
    setLeagueAdminData(false)
  }


  const handleDeleteLeague = async (data) => {
    let GetUserLeagues = await DeleteLeagueApi.DeleteLeague({ leagueId: leagueIDvar })
    toast.success("League Deleted successfully")
    window.location.reload(true)
  }

  
 
  return (
    <div className="px-3">
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center">
        {
          bannerData.length > 0 && bannerData.map((data) => {
            return data.screenName === "MyLeagues" && data.screenPosition === "Top" ?
              <img src={data.s3Url} className="img-fluid" alt="..." /> : null
          })
        }
      </div>
      <Heading
        // className='p-2 '
        heading={t("MY_LEAGUE_PERFORMANCE")}
        style={{
          color: " #344054",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: 10,
        }}
      />
      <div>
        <LeagueButtons />
      </div>
      {isLoading ? <Loader /> : <>
        {optionleagueName.length == 0 ? (
          <Tooltip placement="top" title={'Create league to show your data'}>
            <div>
              <ContentHeading />
            </div>
            <div className="pb-10 py-md-2">
              <img
                src={MyLeagueImage}
                alt="league image"
                className="img-fluid py-2 leagueStaticScore"
              ></img>
            </div>
          </Tooltip>
        ) : (
          <>
            <div className="py-3">
              <LeagueButton
                loadUserLeague={loadUserLeague}
                selectedLeagueValues={selectedLeagueValues}
                selectedLeague={selectedLeague}
                optionleagueName={optionleagueName}
                leagueIDvar={leagueIDvar}
                leaguetype={leaguetype}
                leagueDataTablem={leagueDataTablem}
                setSelectedLeagueOption={setSelectedLeagueOption}
                selectedLeagueOption={selectedLeagueOption}
                setLeagueDetails={setLeagueDetails}
                leagueDetails={leagueDetails}
                UserData={UserData}
                handleDeleteLeague={handleDeleteLeague}
                leagueData={leagueData}
                setLeagueAdminData={setLeagueAdminData}
                leagueAdminData={leagueAdminData}
              />
            </div>
            {leagueDetails.length > 0 ?
              (<div className="row">
                <div className="col-12 col-md-6">
                  {leagueIDvar == "" ? <></> : <SizeofMyLeague
                    leagueIDvar={leagueIDvar}
                  />}
                  {leagueIDvar == "" ? <></> : <div className="mt-2">
                    <TotalPointsLeague
                      leagueIDvar={leagueIDvar}
                    />
                  </div>}
                </div>
                <div className="col-12 col-md-6">
                  <TopPointLeague
                    leagueDataTablem={leagueDataTablem}
                    onhandleDateFilter={onhandleDateFilter}
                    value={value}
                    UserData={UserData}
                  />
                </div>
              </div>) :
              (
                <div className="col-12 d-flex justify-content-center mt-4">
                  No data
                </div>
              )}
          </>
        )}
      </>}
    </div>
  );
};

export default Leagues;
