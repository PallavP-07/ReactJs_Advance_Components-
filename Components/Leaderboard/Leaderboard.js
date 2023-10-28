import React, { useState, useEffect } from 'react'
import Elstrikerleaderboard from './Elstriker Leaderboard/Elstrikerleaderboard'
import MyLeagueLeaderboard from './My League Leaderboard/MyLeagueLeaderboard'
import { useTranslation } from 'react-i18next';
import ApiDataGetSportsData from "../../services/LeaderBoardService"
import ApiDataGetCountryData from "../../services/LeaderBoardService"
import ApiDataGetUserLeagueData from "../../services/LeaderBoardService"
import ApiDataGetLeague from "../../services/LeaderBoardService"
import Apidata from "../../services/LeaderBoardService"
import { useSelector } from 'react-redux';
import BannerApidata from "../../Components/Adminpage/Services/AdminServices";
import Loader from "../Loader";

const Leaderboard = () => {
  const UserData = useSelector(state => state.userReducer.user._id);
  const { t, i18n } = useTranslation();
  const [leaderboard, setLeaderboard] = useState([]);
  const [optionSportList, setOptionSportList] = useState([])
  const [optionCountryList, setOptionCountryList] = useState([])
  const [selectedSports, setSelectedSports] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [optionMyLeagueCountryList, setOptionMyLeagueCountryList] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSportsValues, setSelectedSportsValues] = useState()
  const [selectedCountryValues, setSelectedCountryValues] = useState()
  const [selectedLeagueCountryValues, setSelectedLeagueCountryValues] = useState()
  const [selectedLeagueValues, setSelectedLeagueValues] = useState([])
  const [selectedLeagueCountry, setSelectedLeagueCountry] = useState("")
  const [optionleagueName, setOptionLeagueName] = useState([])
  const [sportsData, setSportsData] = useState(null)
  const [countryData, setCountryData] = useState(null)
  const [countryLeagueData, setCountryLeagueData] = useState([])
  const [leagueData, setLeagueData] = useState([])
  const [defaultValue, setDefaultValue] = useState([])
  const [bannerData, setBannerData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let func1 = await bannerImg();
      let func2 = await handleSportsData()
      let func3 = await handleCountryData()
      let func4 = await handleUserLeague()
      let func5 = await initData(0, sportsData, countryData);
    }
    fetchData()
  }, []);

  const bannerImg = async () => {
    setIsLoading(true);
    let adbanner = await BannerApidata.GetAdminhometopbannertable();
    setIsLoading(false);
    let banner = adbanner.data.Results
    setBannerData(banner);
  }
  const initData = async (key, sportsData, countryData) => {
    let GetElstriker
    if (key = 0) {
      GetElstriker = await Apidata.GetElstriker({ country: null, sportsType: null });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      GetElstriker = await Apidata.GetElstriker({ country: countryData, sportsType: sportsData });
      setIsLoading(false);
    }
    setLeaderboard(GetElstriker?.data?.Results);

  };
  const handleSportsData = async () => {
    setIsLoading(true);
    let GetSportsData = await ApiDataGetSportsData.GetSports();
    setIsLoading(false);
    let formatChange = []
    let pickedSportsData = GetSportsData.data.Results
    let obj = {
      "value": null,
      "label": "All"
    }
    formatChange.push(obj)
    pickedSportsData.map((sports, index) => {
      let obj = {
        value: sports._id,
        label: sports.sportName
      }
      formatChange.push(obj)
    })

    setDefaultValue(obj)
    setOptionSportList([...formatChange])
    setSelectedSports(formatChange[0].label)
    setSelectedSportsValues(formatChange[0].label)
  }

  const loadSportsData = (value) => {
    setSportsData(value)
    setSelectedSportsValues(value?.label)
    if (value == null) {
      initData(0, value.value, countryData)
    } else {
      initData(1, value.value, countryData)
    }
  }

  const handleCountryData = async () => {
    setIsLoading(true);
    let GetCountryData = await ApiDataGetCountryData.GetCountryList()
    setIsLoading(false);
    let formatChange = []
    let pickedCountryData = GetCountryData.data.Results
    let obj = {
      "value": null,
      "label": "All"
    }
    formatChange.push(obj)
    pickedCountryData.map((country, index) => {
      let obj = {
        value: country.name,
        label: country.name
      }
      formatChange.push(obj)
    })
    setOptionMyLeagueCountryList([...formatChange])
    setOptionCountryList([...formatChange])
    setSelectedCountry(formatChange[0].label)
    setSelectedLeagueCountry(formatChange[0].label)
    setSelectedCountryValues(formatChange[0].label)
  }

  const loadCountryData = (value) => {
    setCountryData(value)
    setSelectedCountryValues(value?.label)
    if (value == null) {
      initData(0, sportsData.value, value.value)
    } else {
      initData(1, sportsData == null ? null : sportsData.value, value == null ? null : value.value)
    }
  }
  const loadLeagueCountryData = (value) => {
    setCountryLeagueData(value)
    setSelectedLeagueCountryValues(value?.label)
  }

  const handleUserLeague = async () => {
    setIsLoading(true);
    let GetUserLeagues = await ApiDataGetUserLeagueData.GetUserLeagues({ userId: UserData })
    setIsLoading(false);
    let userLeagueResult = GetUserLeagues.data.Results
    let leagueNameArr = []
    userLeagueResult.map((leagueDetails) => {
      let MyleagueData = leagueDetails?.leagueData[0]
      if (MyleagueData !== undefined) {
        let leagueName = MyleagueData?.leagueName
        let leagueIdData = MyleagueData?.leagueId
        let leagueType = MyleagueData?.leagueType
        let obj1 = {}
        obj1["value"] = leagueIdData
        obj1["type"] = leagueType
        obj1["label"] = leagueName
        leagueNameArr.push(obj1)
      }
    })
    setOptionLeagueName([...leagueNameArr])
    setSelectedLeague(leagueNameArr[0].label)
    setLeagueData(leagueNameArr[0])
    setSelectedLeagueValues(leagueNameArr[0].label)
  }

  const loadUserLeague = (value) => {
    setLeagueData(value)
    setSelectedLeagueValues(value?.label)
  }

  return (
    <div className='px-1 '
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
    >
      <div className="mt-2 col-md-12 d-flex flex-row justify-content-center">
        {
          bannerData.length > 0 && bannerData.map((data) => {
            return data?.screenName === "Leaderboard" && data?.screenPosition === "Top" ?
              <img src={data.s3Url} className="img-fluid adBanner" alt="..." /> : null
          })
        }
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Elstrikerleaderboard
            leaderboard={leaderboard}
            selectedSportsValues={selectedSportsValues}
            selectedCountryValues={selectedCountryValues}
            loadSportsData={loadSportsData}
            loadCountryData={loadCountryData}
            selectedSports={selectedSports}
            optionSportList={optionSportList}
            optionCountryList={optionCountryList}
            selectedCountry={selectedCountry}
            countryData={countryData}
            sportsData={sportsData}
            defaultValue={defaultValue}
          />
          <MyLeagueLeaderboard
            countryLeagueData={countryLeagueData}
            leagueData={leagueData}
            selectedLeagueCountryValues={selectedLeagueCountryValues}
            loadLeagueCountryData={loadLeagueCountryData}
            optionMyLeagueCountryList={optionMyLeagueCountryList}
            selectedLeagueCountry={selectedLeagueCountry}
            loadUserLeague={loadUserLeague}
            optionleagueName={optionleagueName}
            selectedLeague={selectedLeague}
            selectedLeagueValues={selectedLeagueValues}
          />
        </>
      )}
    </div>
  )
}

export default Leaderboard
