import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import Heading from "../../Heading";
import CartForLeague from "./Graph";
import { useTranslation } from 'react-i18next';
import Apidata from "../../../services/LeagueService";

const TotalPointsLeague = ({ leagueIDvar, leagueDataTablem }) => {
  const { t, i18n } = useTranslation();
  const [pointData, setPointData] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [leagueID, setLeagueID] = useState([]);
  const [graphColor, setGraphColor] = useState();
  const [value, setValue] = useState(1);

  useEffect(() => {
    leagueSize("All")
  }, [leagueIDvar])

  const leagueSize = async (sendingKey) => {
    let sendindData = {
      leagueId: leagueIDvar === undefined ? "" : leagueIDvar,
       duration: sendingKey
    }
    let leagueGraph = await Apidata.LeagueTotalPointApi(sendindData);
    let leagues = leagueGraph.data.Results;
    let onlySize = [], onlyCountry = [], onlyLeagueId = [], colors = []
    leagues.map(item => {
      onlySize.push(item.Points)
      onlyCountry.push(item.leagueName)
      onlyLeagueId.push(item.leagueId)
      if (item.leagueId == leagueIDvar) {
        colors.push('#002B98')
      } else {
        colors.push('#F48220')
      }
    })
    setPointData(onlySize)
    setCountryDetails(onlyCountry)
    setLeagueID(onlyLeagueId)
    setGraphColor(colors)
  }
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
    leagueSize(sendingKey);
  };


  return (
    <>
      <div className="mainDiv">
        <Heading
          className='p-3 '
          heading={t('TOTAL_POINTS_IN_MY_LEAGUE')}
          style={{ color: " #344054", fontSize: "16px", fontWeight: "bold" }}
        />
        <div className=" ps-3 col-md-12 d-md-flex flex-md-row justify-content-start align-items-center ">
          <Radio.Group onChange={onhandleDateFilter} value={value}>
            <Radio value={1}>{t('ALL')}</Radio>
            <Radio value={2}>{t('LAST_7_DAYS')}</Radio>
            <Radio value={3}>{t('LAST_30_DAYS')}</Radio>
            <Radio value={4}>{t('LAST_YEAR')}</Radio>
          </Radio.Group>
        </div>
        <div className="mb-2">
          <CartForLeague
            sizeData={pointData}
            countryDetails={countryDetails}
            graphColor={graphColor}

          />
        </div>
      </div>
    </>
  );
};

export default TotalPointsLeague;
