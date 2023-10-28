import React, { useState, useEffect } from "react";
import "../../../Assets/Styles/League.css";
import Heading from "../../Heading";
import CartForLeague from "./Graph";
import { useTranslation } from 'react-i18next';
import Apidata from "../../../services/LeagueService";

const SizeofMyLeague = ({ leagueIDvar }) => {
  const { t, i18n } = useTranslation();
  const [sizeofmyLeague, setSizeofmyLeague] = useState(null);
  const [sizeData, setSizeData] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [leagueID, setLeagueID] = useState([]);
  const [graphColor, setGraphColor] = useState();

  useEffect(() => {
    leagueSize()
  }, [leagueIDvar]);

  const leagueSize = async () => {
    let leagueGraph = await Apidata.LeagueGraphApi({ leagueId: leagueIDvar });
    let leagues = leagueGraph.data.Results;
    console.log("leagues_",leagues);
    let size =
      leagues.map(item => {
        if (leagueIDvar == item.leagueId) {
          return item.size
        }
      })

    let onlySize = [], onlyCountry = [], onlyLeagueId = [], colors = []
    leagues.map(item => {
      onlySize.push(item.size)
      onlyCountry.push(item.leagueName)
      onlyLeagueId.push(item.leagueId)
      if (item.leagueId == leagueIDvar) {
        colors.push('#002B98')
      } else {
        colors.push('#F48220')
      }
    })
    setSizeData(onlySize)
    setCountryDetails(onlyCountry)
    setLeagueID(onlyLeagueId)
    setSizeofmyLeague(size)
    setGraphColor(colors)

  }
  return (
    <>
      <div className="mainDiv mt-1" >
        <div className="p-3">
          <Heading
            heading={t('SIZE_OF_MY_LEAGUE')}
            style={{ color: " #344054", fontSize: "16px", fontWeight: "bold" }}
          />
          <div className="pt-2">
            <div style={{ color: " black", fontSize: "14px", fontWeight: "bold" }}>{sizeofmyLeague} {t('MEMBERS')}</div>
          </div>
        </div>
        <div >
        <CartForLeague
          sizeData={sizeData}
          countryDetails={countryDetails}
          graphColor={graphColor}
        />
      </div>
        
      </div>
    </>
  );
};

export default SizeofMyLeague;
